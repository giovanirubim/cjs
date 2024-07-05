import { SrcConsumer } from "./model/src-consumer.js";
import { TokenProducer } from "./model/token-producer.js";

import { parseExpression } from "./lang/parsers/expression.js";
import { skippableList } from "./lang/skippables/skippable-list.js";
import { tokenDefList } from "./lang/tokens/token-def-list.js";

const srcConsumer = new SrcConsumer("3 < 4 || 5 >= 2");
const tokenProducer = new TokenProducer(srcConsumer, tokenDefList, skippableList);
const res = parseExpression(tokenProducer);

console.log(res);
