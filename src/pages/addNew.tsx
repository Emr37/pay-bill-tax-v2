import type { NextPage } from "next"
import Head from "next/head"
import { AddNewBill } from "../components/AddNew"

const AddNew: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>New Bills or Taxes</title>
        <meta name="description" content="Add New Bills or Taxes" />
      </Head>
      <AddNewBill />
    </div>
  )
}

export default AddNew;