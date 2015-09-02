import fetch from 'isomorphic-fetch';

class RewriteFetcher {
  constructor(rewriteRules = []) {
    this.rewriteRules = rewriteRules;
  }

  rewrite(url, urlRewriter) {
    this.rewriteRules.push({url, urlRewriter});
  }

  fetch(url, as) {
    const matchedRules = this.rewriteRules.map((rewriteRule) => {
      let matches;
      if (typeof rewriteRule.url === 'string' && url === rewriteRule.url) {
        return Object.assign({}, rewriteRule);
      } else if (matches = url.match(rewriteRule.url)) {
        return Object.assign({matches}, rewriteRule);
      } else {
        return null;
      }
    }).filter((rewriteRule) => rewriteRule); // reject null

    matchedRules.forEach((matchedRule) => {
      if (!as) {
        as = url;
      }
      url = matchedRule.urlRewriter(url, matchedRule.matches);
    });

    if (as) {
      console.log(`Fetch: ${url} as ${as}`);
    } else {
      console.log(`Fetch: ${url}`);
    }
    return fetch(url);
  }
}

export default RewriteFetcher;
