#!/usr/local/bin/node

/**
 *
 * To run this script:
 *
 * - use npm to install the node-fetch and underscore libraries
 * - get an API key (see https://w3c.github.io/w3c-api/) and fill the value int "api_key"
 * - if you want to use this script using local data (eg, in your local github clone)
 *      - check the "local_ack" below to set a localhost URL
 * - if you want to use this script using remote data
 *      - make sure the localhost variable is set to false
 *
 * That is it. The extra data downloaded from localhost or from github is the list of the people
 * who should be called out separately in the acknowledgment section. Note that the structure in that list can also
 * have an "affiliation" member to be set separately; that may be useful if you want to acknowledge the contribution
 * of a person who is not member of the WG any more (ie, the affiliation will not be filled automatically).
 *
 * Otherwise the data is downloaded via the W3C API. Be patient: if the group is large, at some point it sends out a large number of
 * HTTP requests to get the data of all people...
 *
 * You can adapt it to other WG-s: the various strings and the value of publ_wg must be changed
 *
 */

const apicore    = "https://api.w3.org";
const api_key    = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
const acks = {
    wpub : {
        local_ack  : "http://localhost:8001/LocalData/github/wpub/common/html/ack-script/separate_acks.json",
        gh_ack     : "https://github.com/w3c/wpub/tree/master/common/html/ack-script/separate_acks.json"
    },
    pwpub : {
        local_ack  : "http://localhost:8001/LocalData/github/pwpub/common/html/separate_acks.json",
        gh_ack     : "https://github.com/w3c/pwpub/tree/master/common/html/separate_acks.json"
    }
}
const localhost  = true

const publ_wg    = "100074";
const fetch      = require('node-fetch');
const _          = require('underscore');

//====================================== HTML snippets ==================================
const html_start = `<section id="ack" class="appendix informative">
    <h2>Acknowledgements</h2>
    <p>The editors would like to specially thank the following individuals for making significant
        contributions to the authoring and editing of this specification:</p>

    <ul class="ack">
`

const html_middle = `
    </ul>

    <p>Additionally, the following people were members of the Working Group at the time of publication:</p>

    <ul class="ack">
`

const html_past = `
    </ul>
    <p>The following people were members of the Working Group in the past:</p>

    <ul class="ack">

`

const html_end = `
    </ul>

    <p>The Working Group would also like to thank the members of the
    <a href="https://www.w3.org/dpub/IG/">Digital Publishing Interest Group</a> for all the hard work
    they did paving the road for this specification.</p>
</section>
`

/**
 * Generic ack values
 * that returns JSON data.
 *
 * The function relies on the global apikey, necessary for the W3C API call.
 *
 * @param {boolean} local: should that be a localhost file
 * @returns: a Promise with the json representation of the fetched data
 *
 */
async function getAck(local = localhost) {
    const key = (process.argv.length > 2 && process.argv[2] === 'pwpub') ? 'pwpub' : 'wpub';
    const finalUrl = (local) ? acks[key].local_ack : acks[key].gh_ack;    
    const response =  await fetch(finalUrl);
    if( response.ok ) {
        return response.json();
    } else {
        throw new Error(`HTTP response for the ack file ${response.status}: ${response.statusText} for ${finalUrl}`);
    }
}


/**
 * Generic function to get to some data in JSON through the W3C API. A standard usage of fetch
 * that returns JSON data.
 *
 * The function relies on the global apikey, necessary for the W3C API call.
 *
 * @param {string} url: the URL that should be used to retrieve data
 * @param {string} key: the W3C API Key to authorize API calls
 * @returns: a Promise with the json representation of the fetched data
 *
 */
async function getData(url, key) {
    const response =  await fetch(`${url}apikey=${key}`);
    if( response.ok ) {
        return response.json();
    } else {
        throw new Error(`HTTP response ${response.status}: ${response.statusText}`);
    }
}


/**
 * Get the data of one user
 *
 * @param {string} user_url: the URL identifying the user in the W3C API system
 * @param {string} key: the W3C API Key to authorize API calls
 * @returns: a Promise with an object of the form {name, affiliation}
 */
async function getUserData(user_url, key) {
    let user_info = undefined;
    let affiliation_info = undefined;
    try {
        user_info        = await getData(`${user_url}?`, key);
        affiliation_info = await getData(`${user_info._links.affiliations.href}?`, key);
        let affiliations = affiliation_info._links.affiliations;
        return {
            name:        user_info.name,
            affiliation: (affiliations) ? affiliations[0].title : "No affiliation"
        }
    } catch(err) {
        console.log(`??? ${user_info.name} ${user_url}`);
        console.log(`??? ${JSON.stringify(affiliation_info,null,4)} ${user_url}`);
        throw new Error(err);
    }
}

/**
 * Get a list of users.
 *
 * @param {string} groupid: Group identification number
 * @param {string} key: the W3C API Key to authorize API calls
 * @param {boolean} former: whether this should include the former members, too
 */
async function getUsers(groupid, key, former) {
    // Set up the URL-s for the first and the second pages to be retrieved.
    const api_url1 = (former) ? `${apicore}/groups/${groupid}/users?former=true&` : `${apicore}/groups/${groupid}/users?`;
    const api_url2 = `${api_url1}page=2&`;

    // Get the data. To speed up, spawn to requests and run them in parallel
    const [user_infos1, user_infos2] = await Promise.all([getData(api_url1, key), getData(api_url2, key)])

    // Extract the URL-s identifying each user. The result is an array of URL-s
    let user_urls = user_infos1._links.users.map((info) => info.href);
    if (user_infos2._links.users) {
        user_urls = user_urls.concat(user_infos2._links.users.map((info) => info.href));
    }
    return user_urls;
}

/**
 * Clean up the member lists. This means:
 * - Remove duplicates within each list; this may mean that the same person got onto the list twice
 *   with different affiliations. This should not happen, but it does:-(
 * - Remove names from the "all" list that are also on the "current" list, ie, to get a clean list
 *   of former members
 * - Filter out both lists v.a.v. the special ack list, enriching the latter with affiliation on the fly
 *
 * @param {Array} separate_acks: list of people to be acknowledged separately
 * @param {Array} current_members: list of current WG members
 * @param {Array} all_members: list of past and present members
 * @return the three lists in a three-tuple
 */
function clean_up(separate_acks, current_members, all_members) {
    let clean_list = (members) => {
        return _.chain(members)
                .map( (member, index, list) => {
                    // Repeated values means that two consecutive entries have the same name
                    let next = list[index+1];
                    if (next !== undefined && next.name === member.name) {
                        if (member.affiliation !== undefined) {
                            if (next.affiliation !== undefined) {
                                member.affiliation = `${member.affiliation}, ${next.affiliation}`
                            }
                        } else {
                            if (next.affiliation !== undefined) {
                                member.affiliation = next.affiliation;
                            }
                        }
                        next.remove = true;
                    }

                    // A rare case that also happens
                    if (member.affiliation === undefined) {
                        member.affiliation = "No affiliation";
                    }
                    return member;
                })
                .filter((member) => member.remove === undefined)
                .value();
    };

    let combine_separate = (members) => {
        return _.chain(members)
                .map( (member) => {
                    let special = separate_acks.find((special) => special.name === member.name)
                    if (special) {
                        // This is a special person...
                        special.affiliation = member.affiliation;
                        member.remove = true;
                    }
                    return member
                })
                .filter((member) => member.remove === undefined)
                .value();
    }

    // Basic cleanup of the lists
    let cleaned_current = clean_list(current_members);

    // Filter the "all" list by removing the current members and then clean it
    let cleaned_all = clean_list(_.filter(all_members, (past_m) => {
            return _.find(cleaned_current, (current_m) => current_m.name === past_m.name) === undefined;
        })
    );

    // Remove the persons appearing on the special list
    cleaned_current = combine_separate(cleaned_current);
    cleaned_all = combine_separate(cleaned_all);

    return [separate_acks, cleaned_current, cleaned_all];
}


/**
 * The main entry point:
 * - gets the group data based on the group id
 * - for each user the name and affiliation is gathered
 * - combines the result in an HTML structure
 *
 * @param {string} groupid: Group identification number
 * @param {string} key: the W3C API Key to authorize API calls
 */
async function main(groupid, key) {
    const generate_list = (members) => {
        return members.map( (person) => {
            if (person.chair === true) {
                return `        <li>${person.name} (${person.affiliation}, co-chair)</li>`
            } else {
                return `        <li>${person.name} (${person.affiliation})</li>`
            }
        }).join("\n")
    };

    try {
        // Get the list of special acknowledgments' persons
        const separate_acks = await getAck();

        // Get the list of current and all WG members' URLs. Let that be done in parallel for former included and not included...
        const [current_user_urls, all_user_urls] = await Promise.all([
            getUsers(groupid, key, former = false),
            getUsers(groupid, key, former = true)
        ]);

        // Get hold of all the names and affiliations.
        const [current_user_data, all_user_data] = await Promise.all([
                await Promise.all(current_user_urls.map((user) => getUserData(user, key))),
                await Promise.all(all_user_urls.map((user) => getUserData(user, key)))
            ]);

        let [final_separate_acks, final_current, final_past] = clean_up(separate_acks, current_user_data, all_user_data);
//        console.log(html_start + generate_list(final_separate_acks) + html_middle + generate_list(final_current) + html_past + generate_list(final_past) + html_end)
        console.log(html_start + generate_list(final_separate_acks) + html_middle + generate_list(final_current) + html_end)

    } catch(err) {
        console.error(`Something is wrong... ${err.toString()}`)
    }
}

// Run with the groupid of the Publishing WG
main(publ_wg, api_key);
