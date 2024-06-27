import { parseSumOrSub } from "./lang/parsers/sum-or-sub.js";
import { tokenDefList } from "./lang/tokens/token-def-list.js";
import { SrcConsumer } from "./model/src-consumer.js";
import { TokenProducer } from "./model/token-producer.js";
const srcConsumer = new SrcConsumer("15*4+2-3/2");
const tokenProducer = new TokenProducer(srcConsumer, tokenDefList);
const tree = parseSumOrSub(tokenProducer);
console.log(JSON.stringify(tree));
