class ErrorRepository {
    constructor() {
      this.errors = new Map();
    }
  
    addError(code, description) {
      this.errors.set(code, description);
    }
  
    translate(code) {
      return this.errors.has(code) ? this.errors.get(code) : 'Unknown error';
    }
  }
  
  describe('ErrorRepository', () => {
    let errorRepo;
  
    beforeEach(() => {
      errorRepo = new ErrorRepository();
    });
  
    test('should add and translate an error correctly', () => {
      errorRepo.addError(404, 'Not Found');
      expect(errorRepo.translate(404)).toBe('Not Found');
    });
  
    test('should return "Unknown error" for non-existent error code', () => {
      expect(errorRepo.translate(500)).toBe('Unknown error');
    });
  
    test('should handle multiple errors', () => {
      errorRepo.addError(400, 'Bad Request');
      errorRepo.addError(401, 'Unauthorized');
      errorRepo.addError(403, 'Forbidden');
  
      expect(errorRepo.translate(400)).toBe('Bad Request');
      expect(errorRepo.translate(401)).toBe('Unauthorized');
      expect(errorRepo.translate(403)).toBe('Forbidden');
    });
  
    test('should overwrite existing error code with new description', () => {
      errorRepo.addError(404, 'Not Found');
      errorRepo.addError(404, 'Resource Not Found');
  
      expect(errorRepo.translate(404)).toBe('Resource Not Found');
    });
  
    test('should handle non-numeric error codes', () => {
      errorRepo.addError('ERR001', 'Custom Error');
      expect(errorRepo.translate('ERR001')).toBe('Custom Error');
    });
  
    test('should return "Unknown error" for undefined error code', () => {
      expect(errorRepo.translate(undefined)).toBe('Unknown error');
    });
  
    test('should return "Unknown error" for null error code', () => {
      expect(errorRepo.translate(null)).toBe('Unknown error');
    });
  });