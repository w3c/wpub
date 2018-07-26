#!/usr/local/bin/node

/**
 *
 * To run this script:
 *
 * - use npm to install the node-fetch library
 * - get an API key (see https://w3c.github.io/w3c-api/) and fill the value int "api_key"
 * - if you want to use this script using local data (eg, in your local github clone)
 *      - check the "local_ack" below to set a localhost URL 
 * - if you want to use this script using remote data
 *      - make sure the localhost variable is set to false
 * 
 * That is it. The data that is downloaded from localhost or from github is the list of the people
 * who should be called out separately in the acknowledgment section. Note structure in the list can also 
 * have an "affiliation" member to be set separately; that may be useful if you want to acknowledge the contribution
 * of a person who is not member of the WG any more (ie, the affiliation will not be filled automatically)
 * 
 * You can adapt it to other WG-s: the various strings and the value of publ_wg must be changed
 * 
 */

const apicore    = "https://api.w3.org";
const api_key    = "XXXXXXXXXXXXXXXXXXXXXXXXXXXX";
const local_ack  = "http://localhost:8001/LocalData/github/wpub/common/html/ack-script/separate_acks.json";
const gh_ack     = "https://github.com/w3c/wpub/tree/master/common/html/ack-script/separate_acks.json"
const localhost  = true

const publ_wg    = "100074";
const fetch      = require('node-fetch');


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
    let finalUrl = (local) ? local_ack : gh_ack;
    let response =  await fetch(finalUrl);
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
 * @param {boolean} page: should that be page 2
 * @returns: a Promise with the json representation of the fetched data
 *
 */
async function getData(url, key, page = false) {
    let finalUrl =  (page) ? `${url}?page=2&apikey=${key}` : `${url}?apikey=${key}`;
    let response =  await fetch(finalUrl);
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
    let user_info        = await getData(user_url, key);
    let affiliation_info = await getData(user_info._links.affiliations.href, key); 
    return {
        name:        user_info.name,
        affiliation: affiliation_info._links.affiliations[0].title
    }
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
    try {
        // Get the list of special acknowledgments
        let separate_acks = await getAck();

        // Get the group-specific structure for all the users
        let user_infos  = await getData(`${apicore}/groups/${groupid}/users`, key);

        // Extract the URL-s identifying each user. The result is an array of URL-s
        let user_urls  = user_infos._links.users.map((info) => info.href);

        // Repeat the exercise above with page 2
        user_infos  = await getData(`${apicore}/groups/${groupid}/users`, key, page = true);
        user_urls   = user_urls.concat(user_infos._links.users.map((info) => info.href));

        // Get hold of all the names and affiliations.
        // Note the 'Promise.all' construction, which means that, potentially, the data for the users are fetched in parallel
        let user_data = await Promise.all(user_urls.map((user) => getUserData(user, key)));

        // Filter out the special acknowledgment people, extending the relevant entries in the special table with the affiliation
        let member_data =  user_data.filter( (user) => {
            let special = separate_acks.find( (ack) => ack.name === user.name )
            if (special === undefined) {
                // this is not a special person...
                return true
            } else {
                special.affiliation = special.chair ? `${user.affiliation}; co-chair` : `${user.affiliation}`;
                return false
            }
        })

        // Turn each item into a HTML <li> element
        let special_items = separate_acks.map((user) => `        <li>${user.name} (${user.affiliation})</li>`);
        let user_items = member_data.map((user) => `        <li>${user.name} (${user.affiliation})</li>`)
        // That's it, folks!
        console.log(html_start + special_items.join("\n") + html_middle + user_items.join("\n") + html_end)        
    } catch(err) {
        console.error(`Something is wrong... ${err}`)
    }
}


// Run with the groupid of the Publishing WG
main(publ_wg, api_key);
