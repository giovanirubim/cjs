import { TokenProducer } from "../../../model/token-producer.js";
import { Expression } from "../../model/expression.js";
import { parseOperation10 } from "./operation-10.js";

const parseOperand = (tokenProducer: TokenProducer): Expression => {
	return parseOperation10(tokenProducer);
};

export const parseOperation11 = (tokenProducer: TokenProducer): Expression => {
	return parseOperand(tokenProducer);
};
