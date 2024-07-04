import { TokenProducer } from "../../../model/token-producer.js";
import { Expression } from "../../model/expression.js";
import { parseOperation3 } from "../operations/operation-3.js";

export const parseOperand4 = (tokenProducer: TokenProducer): Expression => {
	return parseOperation3(tokenProducer);
};
