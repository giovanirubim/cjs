import { TokenProducer } from "../../../../model/token-producer.js";
import { Expression } from "../../expression.js";
import { parseOperation2 } from "../operations/operation-2.js";

export const parseOperand3 = (tokenProducer: TokenProducer): Expression => {
	return parseOperation2(tokenProducer);
};
