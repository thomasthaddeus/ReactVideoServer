import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import App from './App';

afterEach(() => {
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

test('renders the section title', () => {
  render(<App />);
  const titleElement = screen.getAllByText(/Section 5/i)[0];
  expect(titleElement).toBeInTheDocument();
});

test('renders video cards', () => {
  render(<App />);
  const videoCards = screen.getAllByRole('img');
  expect(videoCards.length).toBeGreaterThan(0);
});

test('filters video cards from search input', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/search videos/i), {
    target: { value: 'rebarrel' },
  });

  expect(screen.getByText(/matching "rebarrel"/i)).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /play rebarrel/i })).toHaveLength(2);
});

test('filters video cards from sidebar categories', () => {
  render(<App />);
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

test('combines search and sidebar category filters', () => {
  render(<App />);
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

test('expands manual categories with disclosure buttons', () => {
  render(<App />);
  const schematicsButton = screen.getByRole('button', { name: /schematics/i });

  expect(schematicsButton).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(schematicsButton);

  expect(schematicsButton).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('link', { name: /1014dl-colt1911-gun schematics/i })).toBeInTheDocument();
});

test('searches manual names and expands matching parent groups', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/search manuals/i), {
    target: { value: 'Beretta92FS' },
  });

  expect(screen.getByText(/manual matching "Beretta92FS"/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /schematics/i })).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('button', { name: /1104d-lberetta92/i })).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('link', { name: /beretta92fs/i })).toBeInTheDocument();
});

test('searches manual paths', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/search manuals/i), {
    target: { value: 'ruger_mk3.pdf' },
  });

  expect(screen.getByRole('link', { name: /ruger_mk3/i })).toBeInTheDocument();
});

test('closes mobile sidebar when a top nav target is selected', () => {
  stubMobileViewport(true);
  render(<App />);

  expect(document.querySelector('aside')).toHaveAttribute('aria-hidden', 'false');
  fireEvent.click(screen.getByRole('link', { name: /^videos$/i }));

  expect(document.querySelector('aside')).toHaveAttribute('aria-hidden', 'true');
});

test('closes mobile sidebar when a manual is selected', () => {
  stubMobileViewport(true);
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /schematics/i }));
  fireEvent.click(screen.getByRole('link', { name: /1014dl-colt1911-gun schematics/i }));

  expect(document.querySelector('aside')).toHaveAttribute('aria-hidden', 'true');
});

test('closes mobile sidebar from the drawer backdrop', () => {
  render(<App />);
  fireEvent.click(document.querySelector('button[aria-label="Close sidebar"]'));

  expect(document.querySelector('aside')).toHaveAttribute('aria-hidden', 'true');
});

test('shows thumbnail fallback when an image fails to load', () => {
  render(<App />);
  fireEvent.error(screen.getAllByRole('img')[0]);

  expect(screen.getByRole('img', { name: /thumbnail unavailable/i })).toBeInTheDocument();
  expect(screen.getByText(/thumbnail unavailable/i)).toBeInTheDocument();
});

test('shows server unavailable message after repeated media failures', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
  render(<App />);
  const thumbnails = screen.getAllByRole('img').slice(0, 3);

  thumbnails.forEach((thumbnail) => fireEvent.error(thumbnail));

  expect(await screen.findByText(/media server appears to be unavailable/i)).toBeInTheDocument();
});

test('shows video loading and error states in the player modal', () => {
  render(<App />);
  fireEvent.click(screen.getAllByRole('img')[0]);

  expect(screen.getByText(/loading video/i)).toBeInTheDocument();

  const videoElement = document.querySelector('video');
  fireEvent.error(videoElement);

  expect(screen.queryByText(/loading video/i)).not.toBeInTheDocument();
  expect(screen.getByRole('alert')).toHaveTextContent(/video could not be loaded/i);
});

test('opens video player on thumbnail click', () => {
  const { container } = render(<App />);
  const thumbnail = screen.getAllByRole('img')[0];
  fireEvent.click(thumbnail);
  const videoElement = container.querySelector('video');
  expect(videoElement).toBeInTheDocument();
});

test('closes video player on close button click', () => {
  const { container } = render(<App />);
  const thumbnail = screen.getAllByRole('img')[0];
  fireEvent.click(thumbnail);
  const closeButton = screen.getByRole('button', { name: /close video player/i });
  fireEvent.click(closeButton);
  const videoElement = container.querySelector('video');
  expect(videoElement).not.toBeInTheDocument();
});
