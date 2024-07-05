import { TokenProducer } from "../../../model/token-producer.js";
import { Expression } from "../../model/expression.js";
import { parseOperation7 } from "./operation-7.js";

const parseOperand = (tokenProducer: TokenProducer): Expression => {
	return parseOperation7(tokenProducer);
};

export const parseOperation8 = (tokenProducer: TokenProducer): Expression => {
	return parseOperand(tokenProducer);
};
