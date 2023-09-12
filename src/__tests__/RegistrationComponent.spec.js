import { mount } from '@vue/test-utils';
import RegistrationComponent from '../components/RegistrationComponent.vue';

jest.mock('@auth0/auth0-vue', () => ({
  useAuth0: () => ({
    loginWithRedirect: jest.fn(),
  }),
}));

describe('RegistrationComponent', () => {
  it('renders the component', () => {
    const wrapper = mount(RegistrationComponent);
    expect(wrapper.exists()).toBe(true);
  });

  it('calls loginWithRedirect when the form is submitted', async () => {
    const wrapper = mount(RegistrationComponent);
    await wrapper.setData({
      user: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
      },
    });

    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.vm.$auth0.loginWithRedirect).toHaveBeenCalledWith({ screen_hint: 'signup' });
  });

  it('handles errors during registration', async () => {
    const errorMessage = 'Registration error';
    wrapper.vm.$auth0.loginWithRedirect.mockRejectedValue(new Error(errorMessage));
    
    const wrapper = mount(RegistrationComponent);
    await wrapper.setData({
      user: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
      },
    });

    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.vm.$auth0.loginWithRedirect).toHaveBeenCalledWith({ screen_hint: 'signup' });
    expect(console.error).toHaveBeenCalledWith('Ошибка при регистрации пользователя:', expect.any(Error));
  });
});
