import { calculateMean } from './app';

describe('Mean Calculation', () => {
    it('should calculate the mean of an array of numbers', () => {
        const numbers = [1, 2, 3, 4, 5];
        const mean = calculateMean(numbers);
        expect(mean).toBe(3);
    });
    it('should handle an empty array', () => {
        const numbers = [];
        const mean = calculateMean(numbers);
        expect(mean).toBeNaN();
      });
    
      it('should handle invalid numbers in the array', () => {
        const numbers = [1, 'foo', 3];
        const mean = calculateMean(numbers);
        expect(mean).toBeNaN();
      });
});