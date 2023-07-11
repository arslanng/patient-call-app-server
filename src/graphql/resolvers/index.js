import path from "path";
import { mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

const resolversArray = loadFilesSync(path.join(__dirname, "/resolvers"), {
  extensions: ["js"],
  extractExports: (fileExport) => { // bu kod index.js ile aynı dizinde resolverler olması durumunda index.js dosyasını merge dışında tutmak için yazıldı ama çalışmıyor. Bu nedenle resolverlar başka bir klasöre taşındı.
    if (typeof fileExport === "function") {
      return fileExport("query_root");
    }
    return fileExport;
  },
});

export default mergeResolvers(resolversArray);