import { TokenProducer } from "../../model/token-producer.js";
import { Expression } from "../model/expression.js";
import { parseOperation14 } from "./operations/operation-14.js";

export const parseExpression = (tokenProducer: TokenProducer): Expression => {
	return parseOperation14(tokenProducer);
};
