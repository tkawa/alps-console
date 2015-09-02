const Config = {
  profileRewriters: [
    {
      url: /^http:\/\/alps\.io\/schema\.org\/(.*)$/,
      urlRewriter: (url, matches) => `https://rawgit.com/alps-io/imports/master/schema.org/output/${matches[1]}.xml`
    },
    {
      url: 'http://alps.io/iana/relations',
      urlRewriter: () => 'https://rawgit.com/alps-io/imports/master/iana/relations.xml'
    },
    {
      url: 'http://alps.io/opensearch/opensearch',
      urlRewriter: () => 'https://rawgit.com/alps-io/imports/master/open-search/openSearch.xml'
    }
  ]
}

export default Config;
