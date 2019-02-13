
if [ "$TRAVIS_BRANCH" != "publish_webpub"
      -a "$TRAVIS_BRANCH" != "publish_audiobook" ]; then
    echo " Nothing to be done"
    exit 0
fi

SNAPSHOT="webpub/snapshot/ECHIDNA"

if [ "$TRAVIS_BRANCH" = "publish_audiobook" ]; then
   SNAPSHOT="audiobook/snapshot/ECHIDNA"
fi

test $TRAVIS_PULL_REQUEST = false && curl "https://labs.w3.org/echidna/api/request" --data "url=$URL$SNAPSHOT" --data "decision=$DECISION" --data "token=$TOKEN"
