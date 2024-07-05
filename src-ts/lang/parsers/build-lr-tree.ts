import { TokenProducer } from "../../model/token-producer.js";
import { Token } from "../../model/token.js";
import { Expression } from "../model/expression.js";

type OperandReader = ((tokenProducer: TokenProducer) => Expression);
type OperatorReader = ((tokenProducer: TokenProducer) => Token | undefined);
type NodeBuilder = ((left: Expression, op: Token, right: Expression) => Expression);

export const buildLRTree = (
	tokenProducer: TokenProducer,
	parseOperand: OperandReader,
	parseOperator: OperatorReader,
	buildNode: NodeBuilder,
): Expression => {
	let tree = parseOperand(tokenProducer);
	for (;;) {
		const op = parseOperator(tokenProducer);
		if (!op) {
			break;
		}
		const right = parseOperand(tokenProducer);
		const newTree = buildNode(tree, op, right);
		tree = newTree;
	}
	return tree;
};
