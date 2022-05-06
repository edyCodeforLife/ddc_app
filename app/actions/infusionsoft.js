import axios from 'axios';

import constant from '../utils/configs/constant';

/**
 * Call Infusionsoft API
 */
export const infusionsoftApi = (member, tagId) => {
  // const contact = createContact(member);
  // console.log(contact);
  createContact(member).then((contact) => {
    if (contact.id !== 0) {
      // If Upsert Contact Success
      // if (tagId === constant.INFUSIONSOFT.TAGS.DOWNLOAD_ECATALOG) {
      applyTagToContact(contact.id, tagId);
      // }
    }
  });
};

/**
 * Create Contact
 */
const createContact = (member) => {
  const URL =
    constant.INFUSIONSOFT.API_URL + constant.INFUSIONSOFT.API_PATH.CONTACTS;
  const data = {
    duplicate_option: 'Email', // If Duplicate, use Update
    given_name: member.name,
    email_addresses: [
      {
        email: member.email,
        field: 'EMAIL1',
      },
    ],
  };
  return axios
    .put(URL, JSON.stringify(data), {
      params: {
        access_token: constant.INFUSIONSOFT.API_TOKEN,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data)
    .catch((error) => {});
};

/**
 * Apply Tag to Contact
 */
const applyTagToContact = (contactId, tagId) => {
  const URL = `${constant.INFUSIONSOFT.API_URL +
    constant.INFUSIONSOFT.API_PATH.TAGS}/${tagId}/contacts`;
  const data = contactId;

  return axios
    .post(URL, contactId, {
      params: {
        access_token: constant.INFUSIONSOFT.API_TOKEN,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data)
    .catch((error) => {});
};
