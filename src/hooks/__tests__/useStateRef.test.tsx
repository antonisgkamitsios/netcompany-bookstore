import { afterEach, expect, it, vi } from 'vitest';
import { renderHook, render } from '@testing-library/react';
import { useStateRef } from '../useStateRef';
import { Box } from '@mui/material';

const mockedProcessNode = vi.fn((node: HTMLElement) => node.getBoundingClientRect().height);

it('should have generated the correct values ', async () => {
  const { result } = renderHook(() => useStateRef(mockedProcessNode));
  render(<Box ref={result.current[0]}></Box>);

  // expect the process node function to have been called
  expect(mockedProcessNode).toHaveBeenCalledTimes(1);

  // expect the process node function result to be equal with the node state
  expect(mockedProcessNode.mock.results[0].value).toEqual(result.current[1]);
});

afterEach(() => {
  vi.clearAllMocks();
});
