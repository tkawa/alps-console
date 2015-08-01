import {ProfileFetcher} from 'alpinist';

class RewriteProfileFetcher extends ProfileFetcher {
  fetch(url, as) {
    var matches;
    if (matches = url.match(/^http:\/\/alps\.io\/(schema\.org|iana)\/(.*)$/)) {
      if (!as) {
        as = url;
      }
      url = `http://localhost:8000/${matches[1]}/${matches[2]}.xml`;
    }
    return super.fetch(url, as);
  }
}

export default RewriteProfileFetcher;
