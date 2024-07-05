import { TokenProducer } from "../../../model/token-producer.js";
import { Expression } from "../../model/expression.js";
import { parseOperation9 } from "./operation-9.js";

const parseOperand = (tokenProducer: TokenProducer): Expression => {
	return parseOperation9(tokenProducer);
};

export const parseOperation10 = (tokenProducer: TokenProducer): Expression => {
	return parseOperand(tokenProducer);
};
