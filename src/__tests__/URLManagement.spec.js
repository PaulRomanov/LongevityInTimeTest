import { mount } from '@vue/test-utils';
import URLManagement from '../components/URLManagement.vue';

describe('URLManagement', () => {
  it('should create a short URL', async () => {
    const wrapper = mount(URLManagement);

    // Моделируем успешный ответ от axios.post
    jest.spyOn(wrapper.vm.$axios, 'post').mockResolvedValue({ data: {} });

    // Заполняем форму данными
    wrapper.setData({
      newURL: {
        longURL: 'https://example.com',
        slug: 'example',
      },
    });

    // Вызываем метод createShortURL
    await wrapper.vm.createShortURL();

    // Проверяем, что форма очищена после успешного создания URL
    expect(wrapper.vm.newURL.longURL).toBe('');
    expect(wrapper.vm.newURL.slug).toBe('');
  });
  it('should edit a short URL', async () => {
    const wrapper = mount(URLManagement);
    const url = {
      id: 1,
      longURL: 'https://example.com',
    };

    // Монтируем компонент и устанавливаем начальное состояние
    wrapper.setData({
      shortURLs: [url],
    });

    // Вызываем метод editShortURL
    await wrapper.vm.editShortURL(url);

    // Проверяем, что URL был изменен
    expect(wrapper.vm.shortURLs[0].longURL).toBe('https://example.com/updated');
  });

  it('should delete a short URL', async () => {
    const wrapper = mount(URLManagement);
    const url = {
      id: 1,
      longURL: 'https://example.com',
    };

    // Монтируем компонент и устанавливаем начальное состояние
    wrapper.setData({
      shortURLs: [url],
    });

    // Вызываем метод deleteShortURL
    await wrapper.vm.deleteShortURL(url);

    // Проверяем, что URL был удален из списка
    expect(wrapper.vm.shortURLs).toHaveLength(0);
  });

  it('should handle errors when editing a short URL', async () => {
    const wrapper = mount(URLManagement);
    const url = {
      id: 1,
      longURL: 'https://example.com',
    };

    // Монтируем компонент и устанавливаем начальное состояние
    wrapper.setData({
      shortURLs: [url],
    });

    // Моделируем ошибку при редактировании URL
    wrapper.vm.editShortURL = jest.fn(() => {
      throw new Error('Edit URL Error');
    });

    // Вызываем метод editShortURL
    await wrapper.vm.editShortURL(url);

    // Проверяем, что обработка ошибки выполнена корректно
    expect(wrapper.vm.shortURLs[0].longURL).toBe('https://example.com'); // URL не изменился
    expect(wrapper.vm.shortURLs).toHaveLength(1); // URL все равно находится в списке
    expect(console.error).toHaveBeenCalledWith('Ошибка при редактировании сокращенного URL:', expect.any(Error));
  });

  it('should handle errors when deleting a short URL', async () => {
    const wrapper = mount(URLManagement);
    const url = {
      id: 1,
      longURL: 'https://example.com',
    };

    // Монтируем компонент и устанавливаем начальное состояние
    wrapper.setData({
      shortURLs: [url],
    });

    // Моделируем ошибку при удалении URL
    wrapper.vm.deleteShortURL = jest.fn(() => {
      throw new Error('Delete URL Error');
    });

    // Вызываем метод deleteShortURL
    await wrapper.vm.deleteShortURL(url);

    // Проверяем, что обработка ошибки выполнена корректно
    expect(wrapper.vm.shortURLs).toHaveLength(1); // URL все равно находится в списке
    expect(console.error).toHaveBeenCalledWith('Ошибка при удалении сокращенного URL:', expect.any(Error));
  });
});
