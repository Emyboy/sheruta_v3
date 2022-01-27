import React from 'react';
import AcceptedMatchList from '../../Match/AcceptedMatchList';

export default function GuestsList({data}) {
  return (
		<AcceptedMatchList
			list={data?.guests.map((x) => ({ users_permissions_user: x }))}
		/>
	)
}
