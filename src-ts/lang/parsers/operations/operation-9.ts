import { TokenProducer } from "../../../model/token-producer.js";
import { Expression } from "../../model/expression.js";
import { parseOperation8 } from "./operation-8.js";

const parseOperand = (tokenProducer: TokenProducer): Expression => {
	return parseOperation8(tokenProducer);
};

export const parseOperation9 = (tokenProducer: TokenProducer): Expression => {
	return parseOperand(tokenProducer);
};
