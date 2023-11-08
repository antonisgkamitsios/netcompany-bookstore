import { Controller, useForm } from 'react-hook-form';
import { Alert, Button, CircularProgress, Snackbar, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import { useCreateBook } from '~/queries/books';

import { FormError } from './FormError';

import { Book } from '~/types';
import { ERROR_MESSAGES } from '~/forms/errorMessages';

import dayjs from 'dayjs';

type BookWithoutId = Omit<Book, 'id'>;

function AddBookForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<BookWithoutId>();

  const createBook = useCreateBook();
  const onSubmit = handleSubmit((data) => {
    createBook.mutate(data, {
      onSuccess: () => {
        reset();
      },
      onError: (err) => {
        // handle the server errors and display them in the form
        if (Number(err.response?.status) >= 500) {
          setError('root', { type: 'custom', message: 'Something went wrong💀. Please try again later.' });
        }
        // we could handle here also the errors that start with 400 eg a name is duplicate or whatever and a cool idea
        // is to put the error that might come from server as "name": ["This field is already used"] to the form's state
      },
    });
  });

  return (
    <Stack component="form" noValidate onSubmit={onSubmit} gap={2} width="min(500px, 100%)" alignItems="center">
      <TextField
        {...register('title', {
          minLength: { value: 10, message: ERROR_MESSAGES.MIN_LENGTH(10) },
          maxLength: { value: 120, message: ERROR_MESSAGES.MAX_LENGTH(120) },
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
        })}
        fullWidth
        label="Title"
        error={!!errors.title}
        helperText={<FormError data-testid="lol" error={errors.title?.message} />}
      />

      <TextField
        {...register('description', {
          maxLength: { value: 512, message: ERROR_MESSAGES.MAX_LENGTH(512) },
          pattern: { value: /^[A-Z]/, message: ERROR_MESSAGES.UPPERCASE },
        })}
        fullWidth
        label="Description"
        error={!!errors.description}
        helperText={<FormError error={errors.description?.message} />}
      />
      <TextField
        {...register('author', {
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
        })}
        fullWidth
        label="Author"
        error={!!errors.author}
        helperText={<FormError error={errors.author?.message} />}
      />

      <Controller
        control={control}
        name="published"
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <DatePicker
              label="Published"
              format="DD-MM-YYYY"
              value={dayjs(value, 'DD-MM-YYYY').isValid() ? dayjs(value, 'DD-MM-YYYY') : null}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!error,
                  helperText: <FormError error={error?.message} />,
                },
              }}
              onChange={(date) => onChange(date?.format('DD-MM-YYYY'))}
            />
          );
        }}
      />
      <TextField
        {...register('publisher', {
          minLength: { value: 5, message: ERROR_MESSAGES.MIN_LENGTH(5) },
          maxLength: { value: 60, message: ERROR_MESSAGES.MAX_LENGTH(60) },
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
        })}
        fullWidth
        label="Publisher"
        error={!!errors.publisher}
        helperText={<FormError error={errors.publisher?.message} />}
      />
      <TextField
        {...register('pages', {
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
          max: { value: 9999, message: ERROR_MESSAGES.MAX(9999) },
          min: { value: 0, message: ERROR_MESSAGES.MIN(0) },
        })}
        fullWidth
        label="Pages"
        type="number"
        error={!!errors.pages}
        helperText={<FormError error={errors.pages?.message} />}
        inputProps={{ min: 0, max: 9999 }}
      />
      <TextField
        {...register('isbn', {
          maxLength: { value: 13, message: ERROR_MESSAGES.MAX_LENGTH(13) },
          minLength: { value: 13, message: ERROR_MESSAGES.MIN_LENGTH(13) },
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
        })}
        fullWidth
        label="ISBN"
        error={!!errors.isbn}
        helperText={<FormError error={errors.isbn?.message} />}
      />
      <Button
        variant="contained"
        startIcon={createBook.isPending && <CircularProgress size={20} color="inherit" />}
        disabled={createBook.isPending}
        type="submit"
      >
        Create book
      </Button>
      {createBook.isSuccess && (
        <Snackbar data-testid="success-message" open autoHideDuration={3000} onClose={() => createBook.reset()}>
          <Alert onClose={() => createBook.reset()} severity="success" sx={{ width: '100%' }}>
            The book was created successfully
          </Alert>
        </Snackbar>
      )}
      {errors.root && (
        <Snackbar data-testid="error-message" open autoHideDuration={3000} onClose={() => clearErrors('root')}>
          <Alert onClose={() => clearErrors('root')} severity="error" sx={{ width: '100%' }}>
            {errors.root.message}
          </Alert>
        </Snackbar>
      )}
    </Stack>
  );
}

export { AddBookForm };
