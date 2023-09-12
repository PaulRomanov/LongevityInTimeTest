import { mount } from '@vue/test-utils';
import LoginComponent from '@/components/LoginComponent.vue';

describe('LoginComponent', () => {
  it('renders form fields correctly', async () => {
    const wrapper = mount(LoginComponent);

    // Проверяем, что поля формы для email и пароля существуют
    expect(wrapper.find('#email').exists()).toBe(true);
    expect(wrapper.find('#password').exists()).toBe(true);
  });

  it('submits the form on button click', async () => {
    const wrapper = mount(LoginComponent);

    // Мокируем метод loginUser
    const loginUser = jest.fn();
    wrapper.vm.loginUser = loginUser;

    // Симулируем заполнение полей формы
    await wrapper.setData({
      user: {
        email: 'test@example.com',
        password: 'password123',
      },
    });

    // Нажимаем кнопку "Войти"
    await wrapper.find('form').trigger('submit.prevent');

    // Проверяем, что метод loginUser был вызван
    expect(loginUser).toHaveBeenCalled();
  });
});
