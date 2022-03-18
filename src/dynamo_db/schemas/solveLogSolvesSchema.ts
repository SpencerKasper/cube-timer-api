import {v4 as uuidv4} from 'uuid';
interface Solve { userId: string; scramble: string; time: number; solveId: string; cubeType: string; number: number; plusTwo: boolean; dnf: boolean;}
interface SolveResponseSchema { solve: Solve; }
export class SolveLogSolvesSchema {
    static toSchema({
                        solve
                    }: SolveResponseSchema) {
        return {
            userId: {S: solve.userId},
            solveId: {S: solve.solveId ? solve.solveId : uuidv4()},
            scramble: {S: solve.scramble},
            time: {N: solve.time.toString()},
            cubeType: {S: solve.cubeType},
            number: {N: solve.number.toString()},
            plusTwo: {BOOL: solve.plusTwo ? solve.plusTwo : false},
            dnf: {BOOL: solve.dnf ? solve.dnf : false},
        };
    }

    static fromSchema(dynamoDbResponse): Solve[] {
        return dynamoDbResponse.map(response => ({
            solveId: response.solveId.S,
            userId: response.userId.S,
            scramble: response.scramble.S,
            time: Number(response.time.N),
            cubeType: response.cubeType.S,
            number: Number(response.number.N),
            plusTwo: response.plusTwo ? response.plusTwo.BOOL : false,
            dnf: response.dnf ? response.dnf.BOOL : false,
        }));
    }
}