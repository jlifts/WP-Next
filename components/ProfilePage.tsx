/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import useAuth from 'hooks/useAuth';
import React from 'react';
import { useQuery } from '@apollo/client';
import { Order } from 'components';
import { GET_ORDERS } from 'graphql/Queries';
import Heading from './Heading';
// import axios from '../pages/api/axios/gravatar';

type OrderQuery = {
  id: number;
  databaseId: number;
  date: number;
  orderNumber: number;
  status: string;
  total: string;
};

const ProfilePage = (): JSX.Element => {
  const { user } = useAuth();
  const { userId } = user;
  const { data } = useQuery(GET_ORDERS, {
    variables: { customerId: userId },
  });
  // const md5 = crypto.createHash('md5').update(email).digest('hex');
  // const image = axios.get(`/${md5}?r=pg`).then((res: any) => {
  //   return res;
  // });
  // console.log(data?.orders?.nodes);
  const order = data?.orders?.nodes;
  // console.log(order);

  return (
    <div className="flex flex-col font-mont md:col-span-4 text-white">
      <div className="flex tracking-widest uppercase justify-center h-1/5 w-full items-center pt-10 cursor-default border-b">
        <Heading
          level="h4"
          className="text-xl md:text-5xl font-bold tracking-widest"
        >
          Welcome to Team Victis
        </Heading>
      </div>
      {/* For the ranking system */}
      {/* <div className="border-b">
        <p className="text-xl p-6">Ranking: Guru</p>
      </div> */}
      <div className="h-full w-full">
        <Heading level="h5" className="text-xl p-6 font-semibold">
          Past Orders
        </Heading>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-5 mx-6 pb-12 md:pb-0">
          {order &&
            order.map((item: OrderQuery) => (
              <div
                className="flex flex-col col-span-1 w-full h-full cursor-default"
                key={item.id}
              >
                <Order
                  orderNumber={item.orderNumber}
                  status={item.status}
                  date={item.date}
                  total={item.total}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
