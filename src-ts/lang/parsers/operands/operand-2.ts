import { TokenProducer } from "../../../model/token-producer.js";
import { Expression } from "../../model/expression.js";
import { parseOperation1 } from "../operations/operation-1.js";

export const parseOperand2 = (tokenProducer: TokenProducer): Expression => {
	return parseOperation1(tokenProducer);
};