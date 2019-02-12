
SNAPSHOT = ""

if [ "$TRAVIS_BRANCH" != "publish_webpub"
      -a "$TRAVIS_BRANCH" != "publish_audiobook"
      -a "$TRAVIS_BRANCH" != "publish_pubmanifest" ]; then
    echo " Nothing to be done"
    exit 0
fi


if [ "$TRAVIS_BRANCH" = "publish_webpub" ]; then
   SNAPSHOT="webpub/snapshot/ECHIDNA"
fi

if [ "$TRAVIS_BRANCH" = "publish_audiobook" ]; then
   SNAPSHOT="audiobook/snapshot/ECHIDNA"
fi

if [ "$TRAVIS_BRANCH" = "publish_pubmanifest" ]; then
   SNAPSHOT="pubmanifest/snapshot/ECHIDNA"
fi

test $TRAVIS_PULL_REQUEST = false && curl "https://labs.w3.org/echidna/api/request" --data "url=$URL$SNAPSHOT" --data "decision=$DECISION" --data "token=$TOKEN"
