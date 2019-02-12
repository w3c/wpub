
if [ "$TRAVIS_BRANCH" != "publish_webpub"
      -a "$TRAVIS_BRANCH" != "publish_audiobook"
      -a "$TRAVIS_BRANCH" != "publish_pubmanifest" ]; then
    echo " Nothing to be done"
    exit 0
fi


if [ "$TRAVIS_BRANCH" = "publish_webpub" ]; then
   URL="https://rawgit.com/w3c/wpub/webpub/snapshot/ECHIDNA"
fi

if [ "$TRAVIS_BRANCH" = "publish_audiobook" ]; then
   URL="https://rawgit.com/w3c/wpub/audiobook/snapshot/ECHIDNA"
fi

if [ "$TRAVIS_BRANCH" = "publish_pubmanifest" ]; then
   URL="https://rawgit.com/w3c/wpub/pubmanifest/snapshot/ECHIDNA"
fi

test $TRAVIS_PULL_REQUEST = false && curl "https://labs.w3.org/echidna/api/request" --data "url=$URL" --data "decision=$DECISION" --data "token=$TOKEN"
