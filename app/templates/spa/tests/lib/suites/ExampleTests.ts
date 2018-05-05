import TestSuite from '../TestSuite';

export default class extends TestSuite {

    public testSum(): void {
        expect(1 + 2).toBe(3);
    }

}
