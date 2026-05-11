import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterEach, beforeEach, vi } from 'vitest';
import App from './App';
import catalog from '../../server/src/data/catalog.json';

beforeEach(() => {
  const storage = new Map();

  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: {
      clear: vi.fn(() => storage.clear()),
      getItem: vi.fn((key) => storage.get(key) || null),
      removeItem: vi.fn((key) => storage.delete(key)),
      setItem: vi.fn((key, value) => storage.set(key, String(value))),
    },
  });
  vi.stubGlobal('fetch', vi.fn((url) => {
    if (String(url).endsWith('/catalog')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(catalog),
      });
    }

    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ status: 'ok' }),
    });
  }));
});

afterEach(() => {
  window.localStorage?.clear();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function stubMobileViewport(matches = true) {
  vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })));
}

async function renderApp() {
  const result = render(<App />);
  await screen.findByText(/108 of 108 videos/i);
  return result;
}

test('renders the section title', async () => {
  await renderApp();
  const titleElement = screen.getAllByText(/Section 5/i)[0];
  expect(titleElement).toBeInTheDocument();
});

test('renders video cards', async () => {
  await renderApp();
  const videoCards = screen.getAllByRole('img');
  expect(videoCards.length).toBeGreaterThan(0);
});

test('filters video cards from search input', async () => {
  await renderApp();
  fireEvent.change(screen.getByLabelText(/search videos/i), {
    target: { value: 'rebarrel' },
  });

  expect(screen.getByText(/matching "rebarrel"/i)).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /play rebarrel/i })).toHaveLength(2);
});

test('filters video cards from sidebar categories', async () => {
  await renderApp();
  fireEvent.click(screen.getByRole('button', {
    name: /filter by section section 5 - centerfire rifles/i,
  }));

  expect(screen.getByText(/active filter/i)).toBeInTheDocument();
  expect(screen.getAllByRole('button', {
    name: /remove section section 5 - centerfire rifles/i,
  })).toHaveLength(2);
  expect(screen.getByRole('button', { name: /clear filters/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /play rebarrel & blueprint part 1/i })).not.toBeInTheDocument();
});

test('filters video cards by generated course metadata', async () => {
  await renderApp();
  fireEvent.click(screen.getByRole('button', {
    name: /filter by course 3284-rebarrel & blueprint/i,
  }));

  expect(screen.getAllByRole('button', { name: /play rebarrel & blueprint/i })).toHaveLength(2);
  expect(screen.queryByRole('button', { name: /play introduction part a/i })).not.toBeInTheDocument();
});

test('combines search and sidebar category filters', async () => {
  await renderApp();
  fireEvent.click(screen.getByRole('button', {
    name: /filter by topic final blueprint/i,
  }));
  fireEvent.change(screen.getByLabelText(/search videos/i), {
    target: { value: 'part 2' },
  });

  expect(screen.getByText(/matching "part 2"/i)).toBeInTheDocument();
  expect(screen.getByText(/active filter/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /play rebarrel & blueprint part 2/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /play rebarrel & blueprint part 1/i })).not.toBeInTheDocument();
});

test('expands manual categories with disclosure buttons', async () => {
  await renderApp();
  const schematicsButton = screen.getByRole('button', { name: /schematics/i });

  expect(schematicsButton).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(schematicsButton);

  expect(schematicsButton).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('link', { name: /1014dl-colt1911-gun schematics/i })).toBeInTheDocument();
});

test('searches manual names and expands matching parent groups', async () => {
  await renderApp();
  fireEvent.change(screen.getByLabelText(/search manuals/i), {
    target: { value: 'Beretta92FS' },
  });

  expect(screen.getByText(/manual matching "Beretta92FS"/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /schematics/i })).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('button', { name: /1104d-lberetta92/i })).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('link', { name: /beretta92fs/i })).toBeInTheDocument();
});

test('searches manual paths', async () => {
  await renderApp();
  fireEvent.change(screen.getByLabelText(/search manuals/i), {
    target: { value: 'ruger_mk3.pdf' },
  });

  expect(screen.getByRole('link', { name: /ruger_mk3/i })).toBeInTheDocument();
});

test('closes mobile sidebar when a top nav target is selected', async () => {
  stubMobileViewport(true);
  await renderApp();

  expect(document.querySelector('aside')).toHaveAttribute('aria-hidden', 'false');
  fireEvent.click(screen.getByRole('link', { name: /^videos$/i }));

  expect(document.querySelector('aside')).toHaveAttribute('aria-hidden', 'true');
});

test('closes mobile sidebar when a manual is selected', async () => {
  stubMobileViewport(true);
  await renderApp();

  fireEvent.click(screen.getByRole('button', { name: /schematics/i }));
  fireEvent.click(screen.getByRole('link', { name: /1014dl-colt1911-gun schematics/i }));

  expect(document.querySelector('aside')).toHaveAttribute('aria-hidden', 'true');
});

test('closes mobile sidebar from the drawer backdrop', async () => {
  await renderApp();
  fireEvent.click(document.querySelector('button[aria-label="Close sidebar"]'));

  expect(document.querySelector('aside')).toHaveAttribute('aria-hidden', 'true');
});

test('shows thumbnail fallback when an image fails to load', async () => {
  await renderApp();
  fireEvent.error(screen.getAllByRole('img')[0]);

  expect(screen.getByRole('img', { name: /thumbnail unavailable/i })).toBeInTheDocument();
  expect(screen.getByText(/thumbnail unavailable/i)).toBeInTheDocument();
});

test('shows server unavailable message after repeated media failures', async () => {
  fetch.mockImplementation((url) => {
    if (String(url).endsWith('/catalog')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(catalog),
      });
    }

    return Promise.reject(new Error('offline'));
  });
  await renderApp();
  const thumbnails = screen.getAllByRole('img').slice(0, 3);

  thumbnails.forEach((thumbnail) => fireEvent.error(thumbnail));

  expect(await screen.findByText(/media server appears to be unavailable/i)).toBeInTheDocument();
});

test('shows video loading and error states in the player modal', async () => {
  await renderApp();
  fireEvent.click(screen.getAllByRole('img')[0]);

  expect(screen.getByText(/loading video/i)).toBeInTheDocument();

  const videoElement = document.querySelector('video');
  fireEvent.error(videoElement);

  expect(screen.queryByText(/loading video/i)).not.toBeInTheDocument();
  expect(screen.getByRole('alert')).toHaveTextContent(/video could not be loaded/i);
});

test('moves between videos from the player modal', async () => {
  await renderApp();
  fireEvent.click(screen.getByRole('button', { name: /play rebarrel & blueprint part 1/i }));
  let dialog = screen.getByRole('dialog');

  expect(within(dialog).getByRole('heading', { name: /rebarrel & blueprint part 1/i })).toBeInTheDocument();
  expect(screen.getByText(/1 of/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();

  fireEvent.click(screen.getByRole('button', { name: /next/i }));
  dialog = screen.getByRole('dialog');

  expect(within(dialog).getByRole('heading', { name: /rebarrel & blueprint part 2/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /previous/i })).not.toBeDisabled();
});

test('returns focus to the originating card when the player closes', async () => {
  await renderApp();
  const card = screen.getByRole('button', { name: /play rebarrel & blueprint part 1/i });

  fireEvent.click(card);
  fireEvent.click(screen.getByRole('button', { name: /close video player/i }));

  expect(card).toHaveFocus();
});

test('traps tab focus inside the player modal', async () => {
  await renderApp();
  fireEvent.click(screen.getByRole('button', { name: /play rebarrel & blueprint part 1/i }));
  const closeButton = screen.getByRole('button', { name: /close video player/i });
  const videoElement = document.querySelector('video');

  videoElement.focus();
  fireEvent.keyDown(document, { key: 'Tab' });

  expect(closeButton).toHaveFocus();
});

test('persists and resumes the last watched video', async () => {
  await renderApp();
  fireEvent.click(screen.getByRole('button', { name: /play rebarrel & blueprint part 1/i }));
  fireEvent.click(screen.getByRole('button', { name: /close video player/i }));

  expect(JSON.parse(window.localStorage.getItem('video-library:last-watched')).title)
    .toMatch(/rebarrel & blueprint part 1/i);
  expect(screen.getByText(/last watched: rebarrel & blueprint part 1/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /resume/i }));

  expect(within(screen.getByRole('dialog')).getByRole('heading', {
    name: /rebarrel & blueprint part 1/i,
  })).toBeInTheDocument();
});

test('opens video player on thumbnail click', async () => {
  const { container } = await renderApp();
  const thumbnail = screen.getAllByRole('img')[0];
  fireEvent.click(thumbnail);
  const videoElement = container.querySelector('video');
  expect(videoElement).toBeInTheDocument();
});

test('closes video player on close button click', async () => {
  const { container } = await renderApp();
  const thumbnail = screen.getAllByRole('img')[0];
  fireEvent.click(thumbnail);
  const closeButton = screen.getByRole('button', { name: /close video player/i });
  fireEvent.click(closeButton);
  const videoElement = container.querySelector('video');
  expect(videoElement).not.toBeInTheDocument();
});
