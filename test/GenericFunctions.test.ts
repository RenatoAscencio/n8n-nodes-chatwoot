import { validateId } from '../nodes/Chatwoot/GenericFunctions';

describe('GenericFunctions', () => {
  describe('validateId', () => {
    it('should return valid positive integer', () => {
      expect(validateId(1, 'Test ID')).toBe(1);
      expect(validateId(100, 'Test ID')).toBe(100);
      expect(validateId('42', 'Test ID')).toBe(42);
    });

    it('should throw error for zero', () => {
      expect(() => validateId(0, 'Test ID')).toThrow('Test ID must be a positive integer');
    });

    it('should throw error for negative numbers', () => {
      expect(() => validateId(-1, 'Test ID')).toThrow('Test ID must be a positive integer');
      expect(() => validateId(-100, 'Test ID')).toThrow('Test ID must be a positive integer');
    });

    it('should throw error for non-integer numbers', () => {
      expect(() => validateId(1.5, 'Test ID')).toThrow('Test ID must be a positive integer');
      expect(() => validateId(3.14, 'Test ID')).toThrow('Test ID must be a positive integer');
    });

    it('should throw error for NaN', () => {
      expect(() => validateId(NaN, 'Test ID')).toThrow('Test ID must be a positive integer');
      expect(() => validateId('abc', 'Test ID')).toThrow('Test ID must be a positive integer');
    });

    it('should throw error for empty values', () => {
      expect(() => validateId('', 'Test ID')).toThrow('Test ID must be a positive integer');
    });

    it('should use correct field name in error message', () => {
      expect(() => validateId(0, 'Conversation ID')).toThrow(
        'Conversation ID must be a positive integer',
      );
      expect(() => validateId(-5, 'Contact ID')).toThrow('Contact ID must be a positive integer');
    });
  });
});
