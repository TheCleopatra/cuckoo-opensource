export const passwordRules = {
  minLength: 8,
  requireNumber: true,
  requireLetter: true,
  requireSpecialChar: true,
};

export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < passwordRules.minLength) {
    return {
      isValid: false,
      message: `密码长度至少${passwordRules.minLength}位`,
    };
  }

  if (passwordRules.requireNumber && !/\d/.test(password)) {
    return {
      isValid: false,
      message: '密码必须包含数字',
    };
  }

  if (passwordRules.requireLetter && !/[a-zA-Z]/.test(password)) {
    return {
      isValid: false,
      message: '密码必须包含字母',
    };
  }

  if (passwordRules.requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      isValid: false,
      message: '密码必须包含特殊字符',
    };
  }

  return {
    isValid: true,
    message: '',
  };
};

export const validateUsername = (username: string): { isValid: boolean; message: string } => {
  if (!username) {
    return {
      isValid: false,
      message: 'Please enter a username',
    };
  }

  if (username.length > 20) {
    return {
      isValid: false,
      message: 'Username cannot exceed 20 characters',
    };
  }

  // Only allow letters, numbers, underscores and Chinese
  if (!/^[\w\u4e00-\u9fa5]+$/.test(username)) {
    return {
      isValid: false,
      message: 'Username can only contain letters, numbers, underscores and Chinese',
    };
  }

  return {
    isValid: true,
    message: '',
  };
};
