import { validateId, simplifyResponse } from '../nodes/Chatwoot/GenericFunctions';
import type { IDataObject } from 'n8n-workflow';

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

    it('should handle string numbers', () => {
      expect(validateId('123', 'Test ID')).toBe(123);
      expect(validateId('1', 'Test ID')).toBe(1);
    });

    it('should handle large numbers', () => {
      expect(validateId(999999, 'Test ID')).toBe(999999);
      expect(validateId('1000000', 'Test ID')).toBe(1000000);
    });
  });

  describe('simplifyResponse', () => {
    it('should extract specified fields from items', () => {
      const items: IDataObject[] = [
        { id: 1, name: 'John', email: 'john@example.com', phone: '123-456' },
        { id: 2, name: 'Jane', email: 'jane@example.com', phone: '789-012' },
      ];
      const fieldsToKeep = ['id', 'name', 'email'];

      const result = simplifyResponse(items, fieldsToKeep);

      expect(result).toEqual([
        { id: 1, name: 'John', email: 'john@example.com' },
        { id: 2, name: 'Jane', email: 'jane@example.com' },
      ]);
    });

    it('should handle missing fields gracefully', () => {
      const items: IDataObject[] = [
        { id: 1, name: 'John' },
        { id: 2, email: 'jane@example.com' },
      ];
      const fieldsToKeep = ['id', 'name', 'email'];

      const result = simplifyResponse(items, fieldsToKeep);

      expect(result).toEqual([
        { id: 1, name: 'John' },
        { id: 2, email: 'jane@example.com' },
      ]);
    });

    it('should return empty objects for items without matching fields', () => {
      const items: IDataObject[] = [
        { foo: 'bar', baz: 'qux' },
      ];
      const fieldsToKeep = ['id', 'name'];

      const result = simplifyResponse(items, fieldsToKeep);

      expect(result).toEqual([{}]);
    });

    it('should handle empty items array', () => {
      const items: IDataObject[] = [];
      const fieldsToKeep = ['id', 'name'];

      const result = simplifyResponse(items, fieldsToKeep);

      expect(result).toEqual([]);
    });

    it('should handle empty fieldsToKeep array', () => {
      const items: IDataObject[] = [{ id: 1, name: 'John' }];
      const fieldsToKeep: string[] = [];

      const result = simplifyResponse(items, fieldsToKeep);

      expect(result).toEqual([{}]);
    });

    it('should preserve nested objects', () => {
      const items: IDataObject[] = [
        { id: 1, meta: { page: 1, total: 10 }, name: 'John' },
      ];
      const fieldsToKeep = ['id', 'meta'];

      const result = simplifyResponse(items, fieldsToKeep);

      expect(result).toEqual([
        { id: 1, meta: { page: 1, total: 10 } },
      ]);
    });

    it('should preserve arrays', () => {
      const items: IDataObject[] = [
        { id: 1, labels: ['urgent', 'customer'], name: 'Conversation 1' },
      ];
      const fieldsToKeep = ['id', 'labels'];

      const result = simplifyResponse(items, fieldsToKeep);

      expect(result).toEqual([
        { id: 1, labels: ['urgent', 'customer'] },
      ]);
    });

    it('should handle null and undefined values', () => {
      const items: IDataObject[] = [
        { id: 1, name: null, email: undefined },
      ];
      const fieldsToKeep = ['id', 'name', 'email'];

      const result = simplifyResponse(items, fieldsToKeep);

      // undefined fields are not included, null is included
      expect(result).toEqual([{ id: 1, name: null }]);
    });

    it('should handle boolean false values', () => {
      const items: IDataObject[] = [
        { id: 1, active: false, enabled: true },
      ];
      const fieldsToKeep = ['id', 'active', 'enabled'];

      const result = simplifyResponse(items, fieldsToKeep);

      expect(result).toEqual([{ id: 1, active: false, enabled: true }]);
    });

    it('should handle zero numeric values', () => {
      const items: IDataObject[] = [
        { id: 1, count: 0, total: 100 },
      ];
      const fieldsToKeep = ['id', 'count'];

      const result = simplifyResponse(items, fieldsToKeep);

      expect(result).toEqual([{ id: 1, count: 0 }]);
    });
  });
});
