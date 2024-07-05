import { TokenProducer } from "../../../model/token-producer.js";
import { Expression } from "../../model/expression.js";
import { parseOperation4 } from "./operation-4.js";

const parseOperand = (tokenProducer: TokenProducer): Expression => {
	return parseOperation4(tokenProducer);
};

export const parseOperation5 = (tokenProducer: TokenProducer): Expression => {
	return parseOperand(tokenProducer);
};
