import { TokenProducer } from "../../../model/token-producer.js";
import { Expression } from "../expression.js";
import { parseOperation1 } from "./operations/operation-1.js";

export const parseExpression = (tokenProducer: TokenProducer): Expression => {
	return parseOperation1(tokenProducer);
};
