import React from 'react';
import { format } from 'date-fns';

const Subtable = ({email ,id ,date,deletemail}:{email:string ,id:string,date:Date,deletemail:React.FunctionComponent}) => {
    return (
        <tr className=' bg-white border-b text-left'>
            <th scope='row' className=' px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                {email?email:"No email"}
            </th>
            <td className=' px-6 py-4 hidden sm:block '>{date?format(date, ' yyyy MMM dd'):"x"}</td>
            <td className=' px-6 py-4  cursor-pointer'onClick={() => deletemail(id)}>x</td>
        </tr>
    );
}

export default Subtable;
