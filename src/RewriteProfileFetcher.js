import {ProfileFetcher} from 'alpinist';

class RewriteProfileFetcher extends ProfileFetcher {
  fetch(url, as) {
    var matches;
    if (matches = url.match(/^http:\/\/alps\.io\/schema\.org\/(.*)$/)) {
      if (!as) {
        as = url;
      }
      url = `http://localhost:8000/schema/${matches[1]}.xml`;
    }
    return super.fetch(url, as);
  }
}

export default RewriteProfileFetcher;
