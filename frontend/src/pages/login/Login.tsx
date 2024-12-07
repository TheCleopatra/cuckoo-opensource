import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/hooks/useAuth';
import { validatePassword, validateUsername } from '~/utils/validation';
import axios, { AxiosError } from 'axios';
import { ApiError } from '~/types/error';

interface FormErrors {
  username?: string;
  usernameStatus?: 'success' | 'error';
  password?: string;
  confirmPassword?: string;
  submit?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    // email: '',
    // verificationCode: '',
    // confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  // 组件销毁时，重置表单
  useEffect(() => {
    return () => {
      setFormData({
        username: '',
        password: '',
      });
      setErrors({});
      setShowPassword(false); // 重置密码可见性
    };
  }, []);

  // 表单验证
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 用户名验证
    const usernameValidation = validateUsername(formData.username);
    if (!usernameValidation.isValid) {
      newErrors.username = usernameValidation.message;
    }

    // 密码验证
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // 清除对应字段的错误
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // 按登录提交即可，后台验证，最终返回登录成功的信息，存一下用户的token和userinfo, 或者返回失败的信息
  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // 尝试登录
      await login({
        username: formData.username,
        password: formData.password,
      });

      navigate('/home'); // 登录成功后导航到欢迎页面
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<ApiError>;
        const errorMessage = axiosError.response?.data?.error || axiosError.response?.data?.message || '登录失败，请重试';
        setErrors({ submit: errorMessage });
      } else if (err instanceof Error) {
        setErrors({ submit: err.message });
      } else {
        setErrors({ submit: '发生未知错误' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-[320px] min-h-[600px] px-2 bg-gradient-to-r from-[#f06daf] to-[#2da1ff] text-white">
      <h1 className="text-5xl font-bold mb-2">Cuckoo</h1>
      {errors.submit && (
        <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4 space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-white-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`mt-1 w-full box-border rounded-md border-none ${
              errors.username && errors.usernameStatus !== 'success' ? 'border border-red-300' : 'border border-gray-300'
            } px-3 py-2 shadow-sm outline-none`}
          />
          {errors.username && (
            <p className={`mt-1 text-sm ${errors.usernameStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>{errors.username}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white-700">
            Password
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={handleKeyUp}
              className={`block w-full box-border rounded-md border-none ${
                errors.password ? 'border border-red-300' : 'border border-gray-300'
              } pr-10 px-3 py-2 shadow-sm outline-none`}
            />
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-white text-[#2da1ff] font-semibold w-full py-2 px-4 rounded-full shadow-md hover:bg-gray-200 transition duration-300 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? '...' : 'Sign up/Sign in'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
