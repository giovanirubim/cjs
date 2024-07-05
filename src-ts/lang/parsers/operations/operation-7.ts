import { TokenProducer } from "../../../model/token-producer.js";
import { Expression } from "../../model/expression.js";
import { parseOperation6 } from "./operation-6.js";

const parseOperand = (tokenProducer: TokenProducer): Expression => {
	return parseOperation6(tokenProducer);
};

export const parseOperation7 = (tokenProducer: TokenProducer): Expression => {
	return parseOperand(tokenProducer);
};
