import {ProfileFetcher} from 'alpinist';

class RewriteProfileFetcher extends ProfileFetcher {
  fetch(url, as) {
    let matches;
    if (matches = url.match(/^http:\/\/alps\.io\/schema\.org\/(.*?)(\.xml)?$/)) {
      if (!as) {
        as = url;
      }
      url = `https://rawgit.com/alps-io/imports/master/schema.org/types/${matches[1]}.json`;
    } else if (url === 'http://alps.io/iana/relations') {
      if (!as) {
        as = url;
      }
      url = 'https://rawgit.com/alps-io/imports/master/iana/relations.xml';
    } else if (url === 'http://alps.io/opensearch/opensearch') {
      if (!as) {
        as = url;
      }
      url = 'https://rawgit.com/alps-io/imports/master/open-search/openSearch.xml';
    }
    return super.fetch(url, as);
  }
}

export default RewriteProfileFetcher;
