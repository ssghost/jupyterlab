// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { getItem, getText, getNumber } from '@jupyterlab/apputils';

import {
  acceptDialog,
  dismissDialog,
  waitForDialog
} from '@jupyterlab/testutils';

describe('@jupyterlab/apputils', () => {
  describe('getItem()', () => {
    it('should accept at least two arguments', async () => {
      const dialog = getItem({
        label: 'list',
        items: ['item1']
      });

      await dismissDialog();
      expect((await dialog).button.accept).toBe(false);
    });

    it('should accept options', async () => {
      const dialog = getItem({
        label: 'list',
        items: ['item1', 'item2'],
        current: 1,
        editable: false,
        title: 'Pick a choice',
        placeholder: 'item'
      });

      await acceptDialog();

      const result = await dialog;

      expect(result.button.accept).toBe(true);
      expect(result.value).toBe('item2');
    });

    it('should be editable', async () => {
      const node = document.createElement('div');

      document.body.appendChild(node);

      const prompt = getItem({
        label: 'list',
        items: ['item1', 'item2'],
        title: 'Pick a choice',
        placeholder: 'item',
        editable: true,
        host: node
      });

      await waitForDialog(node);
      const body = node.getElementsByClassName('jp-Input-Dialog').item(0);
      const input = body.getElementsByTagName('input').item(0);
      input.value = 'item3';

      await acceptDialog();

      const result = await prompt;

      expect(result.button.accept).toBe(true);
      expect(result.value).toBe('item3');
      document.body.removeChild(node);
    });
  });

  describe('getText()', () => {
    it('should accept at least one argument', async () => {
      const dialog = getText({
        label: 'text'
      });

      await dismissDialog();
      expect((await dialog).button.accept).toBe(false);
    });

    it('should accept options', async () => {
      const dialog = getText({
        label: 'text',
        title: 'Give a text',
        placeholder: 'your text',
        text: 'answer'
      });

      await acceptDialog();

      const result = await dialog;

      expect(result.button.accept).toBe(true);
      expect(result.value).toBe('answer');
    });

    it('should be editable', async () => {
      const node = document.createElement('div');

      document.body.appendChild(node);

      const prompt = getText({
        label: 'text',
        host: node
      });

      await waitForDialog(node);
      const body = node.getElementsByClassName('jp-Input-Dialog').item(0);
      const input = body.getElementsByTagName('input').item(0);
      input.value = 'my answer';

      await acceptDialog();

      const result = await prompt;

      expect(result.button.accept).toBe(true);
      expect(result.value).toBe('my answer');
      document.body.removeChild(node);
    });
  });

  describe('getNumber()', () => {
    it('should accept at least one argument', async () => {
      const dialog = getNumber({
        label: 'number'
      });

      await dismissDialog();
      expect((await dialog).button.accept).toBe(false);
    });

    it('should accept options', async () => {
      const dialog = getNumber({
        label: 'number',
        title: 'Pick a number',
        value: 10
      });

      await acceptDialog();

      const result = await dialog;

      expect(result.button.accept).toBe(true);
      expect(result.value).toBe(10);
    });

    it('should be editable', async () => {
      const node = document.createElement('div');

      document.body.appendChild(node);

      const prompt = getNumber({
        label: 'text',
        title: 'Pick a number',
        host: node
      });

      await waitForDialog(node);
      const body = node.getElementsByClassName('jp-Input-Dialog').item(0);
      const input = body.getElementsByTagName('input').item(0);
      input.value = '25';

      await acceptDialog();

      const result = await prompt;

      expect(result.button.accept).toBe(true);
      expect(result.value).toBe(25);
      document.body.removeChild(node);
    });

    it('should return NaN if empty', async () => {
      const node = document.createElement('div');

      document.body.appendChild(node);

      const prompt = getNumber({
        label: 'text',
        title: 'Pick a number',
        host: node
      });

      await waitForDialog(node);
      const body = node.getElementsByClassName('jp-Input-Dialog').item(0);
      const input = body.getElementsByTagName('input').item(0);
      input.value = '';

      await acceptDialog();

      const result = await prompt;

      expect(result.button.accept).toBe(true);
      expect(result.value).toBe(Number.NaN);
      document.body.removeChild(node);
    });
  });
});
