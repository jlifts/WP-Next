/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import React from 'react';
import useAuth from 'hooks/useAuth';
import { USER_ADDRESS } from 'graphql/Queries';
import { UPDATE_USER } from 'graphql/Mutations';
// import { DeleteUserBtn } from 'components';

const UserCreationForm = (): JSX.Element => {
  // const [checked, setChecked] = useState(false);
  const { user } = useAuth();
  const { id, firstName, lastName, email, userId } = user;
  const Data = useQuery(USER_ADDRESS, {
    variables: { customerId: userId },
  });
  const billing = Data.data?.customer?.billing;
  const shipping = Data.data?.customer?.shipping;
  const [updateProfile, { data, loading, error }] = useMutation(UPDATE_USER);
  const wasProfileUpdated = Boolean(data?.updateCustomer?.customer?.databaseId);
  // console.log(Data?.data?.customer);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData);
    updateProfile({
      variables: { id, ...values },
    }).catch((err) => {
      console.error(err);
    });
  }

  if (wasProfileUpdated) {
    toast.success(`🦄 Profile Updated!`, {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  if (error) {
    toast.error(`ERROR: ${error}`, {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div className="col-span-4 mx-2 md:mx-10">
      <form
        className="lg:w-full mx-5 lg:mx-auto overflow-hidden z-10 my-5"
        onSubmit={handleSubmit}
      >
        <fieldset
          disabled={loading}
          aria-busy={loading}
          className="space-y-10 flex flex-col justify-center"
        >
          <div className="flex flex-row justify-evenly text-3xl font-bold">
            <h4 className="cursor-default font-items">Profile Information</h4>
          </div>
          {error && (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3"
              role="alert"
            >
              <p className="font-bold font-items">Error</p>
              <p>{error.message}</p>
            </div>
          )}
          <div className="relative border-b-2 focus-within:border-blue-500 z-10">
            <input
              type="text"
              name="firstName"
              placeholder=" "
              defaultValue={firstName || ''}
              autoComplete="given-name"
              className="block w-full appearance-none focus:outline-none bg-transparent z-10"
            />
            <label
              htmlFor="firstName"
              className="absolute top-0 duration-300 z-20 origin-0"
            >
              First Name
            </label>
          </div>
          <div className="relative border-b-2 focus-within:border-blue-500 z-10">
            <input
              type="text"
              name="lastName"
              placeholder=" "
              defaultValue={lastName || ''}
              autoComplete="family-name"
              className="block w-full appearance-none focus:outline-none bg-transparent z-10"
            />
            <label
              htmlFor="lastName"
              className="absolute top-0 duration-300 z-20 origin-0"
            >
              Last Name
            </label>
          </div>
          <div className="relative border-b-2 focus-within:border-blue-500 z-10">
            <input
              type="text"
              name="email"
              placeholder=" "
              defaultValue={email || ''}
              autoComplete="off"
              className="block w-full appearance-none focus:outline-none bg-transparent z-30"
            />
            <label
              htmlFor="email"
              className="absolute top-0 duration-300 origin-0 z-20"
            >
              Email
            </label>
            <div className="text-sm text-gray-600 absolute mt-1">
              <Link href="/passwordreset">Need to reset password?</Link>
            </div>
          </div>
          <div>
            <p className="flex flex-col pb-4 pt-8 font-semibold">
              Profile Photo
            </p>
            <Link href="https://en.gravatar.com/">
              Profile photos powered by Gravatar, visit here to change
            </Link>
          </div>
          <p className="flex flex-col pb-4 pt-8 font-semibold">
            Billing Address
          </p>
          <div className="relative border-b-2 focus-within:border-blue-500 z-10">
            <input
              type="text"
              name="address1"
              placeholder=" "
              defaultValue={billing?.address1 || ''}
              autoComplete="off"
              className="block w-full appearance-none focus:outline-none bg-transparent z-10"
            />
            <label
              htmlFor="address1"
              className="absolute top-0 duration-300 z-20 origin-0"
            >
              Address 1
            </label>
          </div>
          <div className="relative border-b-2 focus-within:border-blue-500 z-10">
            <input
              type="text"
              name="address2"
              placeholder=" "
              defaultValue={billing?.address2 || ''}
              autoComplete="off"
              className="block w-full appearance-none focus:outline-none bg-transparent z-10"
            />
            <label
              htmlFor="address2"
              className="absolute top-0 duration-300 z-20 origin-0"
            >
              Address 2
            </label>
          </div>
          <div className="relative border-b-2 focus-within:border-blue-500 z-10">
            <input
              type="text"
              name="city"
              placeholder=" "
              defaultValue={billing?.city || ''}
              autoComplete="off"
              className="block w-full appearance-none focus:outline-none bg-transparent z-10"
            />
            <label
              htmlFor="city"
              className="absolute top-0 duration-300 z-20 origin-0"
            >
              City
            </label>
          </div>
          <div className="relative border-b-2 focus-within:border-blue-500 z-10">
            <input
              type="text"
              name="postcode"
              placeholder=" "
              defaultValue={billing?.postcode || ''}
              autoComplete="off"
              className="block w-full appearance-none focus:outline-none bg-transparent z-10"
            />
            <label
              htmlFor="postcode"
              className="absolute top-0 duration-300 z-20 origin-0"
            >
              Zip
            </label>
          </div>
          <div className="relative border-b-2 focus-within:border-blue-500 z-10">
            <input
              type="text"
              name="state"
              placeholder=" "
              defaultValue={billing?.state || ''}
              autoComplete="off"
              className="block w-full appearance-none focus:outline-none bg-transparent z-10"
            />
            <label
              htmlFor="state"
              className="absolute top-0 duration-300 z-20 origin-0"
            >
              State
            </label>
          </div>
          <div className="relative border-b-2 focus-within:border-blue-500 z-10">
            <input
              type="text"
              name="company"
              placeholder=" "
              defaultValue={billing?.company || ''}
              autoComplete="off"
              className="block w-full appearance-none focus:outline-none bg-transparent z-10"
            />
            <label
              htmlFor="company"
              className="absolute top-0 duration-300 z-20 origin-0"
            >
              Company
            </label>
          </div>
          <div className="relative border-b-2 focus-within:border-blue-500 z-10">
            <input
              type="text"
              name="phone"
              placeholder=" "
              defaultValue={billing?.phone || ''}
              autoComplete="off"
              className="block w-full appearance-none focus:outline-none bg-transparent z-10"
            />
            <label
              htmlFor="phone"
              className="absolute top-0 duration-300 z-20 origin-0"
            >
              Phone
            </label>
          </div>
          <p className="flex flex-col pb-4 font-semibold">Shipping Address</p>
          {/* TODO:
          <input
            type="checkbox"
            name="SandB"
            className=""
            value={checked}
            onChange={() => setChecked(true)}
          />
          <label htmlFor="SandB" className="ml-3">
            Same as Billing Address
          </label> */}
          <div className="relative border-b-2 focus-within:border-blue-500 z-10">
            <input
              type="text"
              name="Saddress1"
              placeholder=" "
              defaultValue={shipping?.address1 || ''}
              autoComplete="off"
              className="block w-full appearance-none focus:outline-none bg-transparent z-10"
            />
            <label
              htmlFor="Saddress1"
              className="absolute top-0 duration-300 z-20 origin-0"
            >
              Address 1
            </label>
          </div>
          <div className="relative border-b-2 focus-within:border-blue-500 z-10">
            <input
              type="text"
              name="Saddress2"
              placeholder=" "
              defaultValue={shipping?.address2 || ''}
              autoComplete="off"
              className="block w-full appearance-none focus:outline-none bg-transparent z-10"
            />
            <label
              htmlFor="Saddress2"
              className="absolute top-0 duration-300 z-20 origin-0"
            >
              Address 2
            </label>
          </div>
          <div className="relative border-b-2 focus-within:border-blue-500 z-10">
            <input
              type="text"
              name="Scity"
              placeholder=" "
              defaultValue={shipping?.city || ''}
              autoComplete="off"
              className="block w-full appearance-none focus:outline-none bg-transparent z-10"
            />
            <label
              htmlFor="Scity"
              className="absolute top-0 duration-300 z-20 origin-0"
            >
              City
            </label>
          </div>
          <div className="relative border-b-2 focus-within:border-blue-500 z-10">
            <input
              type="text"
              name="Spostcode"
              placeholder=" "
              defaultValue={shipping?.postcode || ''}
              autoComplete="off"
              className="block w-full appearance-none focus:outline-none bg-transparent z-10"
            />
            <label
              htmlFor="Spostcode"
              className="absolute top-0 duration-300 z-20 origin-0"
            >
              Zip
            </label>
          </div>
          <div className="relative border-b-2 focus-within:border-blue-500 z-10">
            <input
              type="text"
              name="Sstate"
              placeholder=" "
              defaultValue={shipping?.state || ''}
              autoComplete="off"
              className="block w-full appearance-none focus:outline-none bg-transparent z-10"
            />
            <label
              htmlFor="Sstate"
              className="absolute top-0 duration-300 z-20 origin-0"
            >
              State
            </label>
          </div>
          <div className="relative border-b-2 focus-within:border-blue-500 z-10">
            <input
              type="text"
              name="Scompany"
              placeholder=" "
              defaultValue={shipping?.company || ''}
              autoComplete="off"
              className="block w-full appearance-none focus:outline-none bg-transparent z-10"
            />
            <label
              htmlFor="Scompany"
              className="absolute top-0 duration-300 z-20 origin-0"
            >
              Company
            </label>
          </div>
          <div className="relative border-b-2 focus-within:border-blue-500 z-10">
            <input
              type="text"
              name="Sphone"
              placeholder=" "
              defaultValue={shipping?.phone || ''}
              autoComplete="off"
              className="block w-full appearance-none focus:outline-none bg-transparent z-10"
            />
            <label
              htmlFor="Sphone"
              className="absolute top-0 duration-300 z-20 origin-0"
            >
              Phone
            </label>
          </div>

          <button
            aria-label="Log In"
            disabled={loading}
            type="submit"
            className="w-1/4 px-3 py-4 text-white bg-secondary rounded-md hover:bg-secondaryAccent focus:bg-secondaryAccent focus:outline-none font-items"
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </fieldset>
      </form>
      {/* <DeleteUserBtn /> */}
    </div>
  );
};

export default UserCreationForm;
