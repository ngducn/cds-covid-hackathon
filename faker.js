const faker = require("faker");
const mongoose = require("mongoose");
const { genSalt, hash } = require("bcrypt");
const Donation = require("./models/Donation");
const Request = require("./models/Request");
const User = require("./models/User");
const Store = require("./models/Store");

const cleanData = async (startTime) => {
  try {
    await mongoose.connection.dropDatabase();
    console.log("| Deleted all data");
    console.log("-------------------------------------------");
  } catch (error) {
    console.log(error);
  }
};

const createRequest = (userId) => {
  const requestItem = [
    "rice",
    "ramen",
    "milk",
    "egg",
    "water",
    "vegetable",
    "mask",
    "soap",
    "shelter",
  ];
  const storeId = [
    "61121bc67ea3f14518dcff67",
    "61121c2c7ea3f14518dcff6b",
    "61121c587ea3f14518dcff6f",
    "61121c6f7ea3f14518dcff73",
    "61121c967ea3f14518dcff77",
    "61121cba7ea3f14518dcff7b",
    "61121cd17ea3f14518dcff7f",
  ];
  const requestNumber = Math.floor(Math.random() * requestItem.length);
  let requestSample = [];
  for (let i = 0; i < requestNumber; i++) {
    requestSample[i] = {
      name: requestItem[i],
      value: Math.floor(Math.random() * 100),
    };
  }
  const storeIndex = storeId[Math.floor(Math.random() * storeId.length)];
  console.log("store", { storeIndex, userId });
  const singleRequest = {
    from: userId,
    to: storeIndex,
    requestSchedule: requestSample,
    description: faker.commerce.productDescription(),
  };
  return { singleRequest, storeIndex };
};
const createDonation = (userId, type) => {
  const donationItem = [
    "rice",
    "ramen",
    "milk",
    "egg",
    "water",
    "vegetable",
    "mask",
    "soap",
    "shelter",
  ];
  const storeId = [
    "61121bc67ea3f14518dcff67",
    "61121c2c7ea3f14518dcff6b",
    "61121c587ea3f14518dcff6f",
    "61121c6f7ea3f14518dcff73",
    "61121c967ea3f14518dcff77",
    "61121cba7ea3f14518dcff7b",
    "61121cd17ea3f14518dcff7f",
  ];
  const donationNumber = Math.floor(Math.random() * donationItem.length);
  let donationSample = [];
  for (let i = 0; i < donationNumber; i++) {
    donationSample[i] = {
      name: donationItem[i],
      value: Math.floor(Math.random() * 100),
    };
  }
  const storeIndex = storeId[Math.floor(Math.random() * storeId.length)];
  console.log("store", { storeIndex, userId });
  let singleDonation;
  if (type === "actual") {
    singleDonation = {
      type: "actual",
      from: userId,
      to: storeIndex,
      item: donationSample,
      description: faker.commerce.productDescription() || "A",
    };
  } else {
    singleDonation = {
      from: userId,
      to: storeIndex,
      item: donationSample,
      description: faker.commerce.productDescription() || "A",
    };
  }

  return { singleDonation, storeIndex };
};
const generateData = async () => {
  const salt = await genSalt(10);

  try {
    // await cleanData();
    console.log("| Create User:");

    for (let i = 0; i < storeArray.length; i++) {}

    for (let i = 0; i < 100; i++) {
      const statusArray = [
        "covid",
        "children",
        "old",
        "unemployed",
        "accident",
      ];
      const statusNumber = Math.floor(Math.random * statusArray.length);

      let sampleStatus = [];
      for (let i = 0; i < statusNumber; i++) {
        let choice;
        do {
          choice = statusArray[Math.floor(Math.random * statusArray.length)];
        } while (sampleStatus.includes(choice));
        sampleStatus[i] = choice;
      }
      const hashpassword = await hash("public", salt);
      const publicUser = {
        name: faker.name.findName(),
        image: faker.image.people(),
        password: hashpassword,
        address: {
          number: faker.address.streetAddress(),
          streetName: faker.address.streetName(),
          ward: Math.floor(Math.random() * 30),
          city: faker.address.cityName(),
          district: Math.floor(Math.random() * 12),
        },
        phone: faker.phone.phoneNumber(),
        status: sampleStatus,
      };

      try {
        const user = await User.create(publicUser);
        let type;
        let requestOrDonate;
        let randomTen = Math.floor(Math.random() * 10);
        console.log(`${i} Created user ${user.name},${user._id}`);
        if (randomTen <= 3) {
          const { singleRequest, storeIndex } = createRequest(user._id);
          requestOrDonate = await Request.create(singleRequest);
          type = "REQUEST";
          const store = await Store.findById(storeIndex);

          const obj = {};
          requestOrDonate.requestSchedule.map(
            (el, idx) => (obj[el.name] = idx)
          );
          const result = await Store.findByIdAndUpdate(
            store._id,
            {
              requestSchedule: {
                rice:
                  store.requestSchedule.rice +
                  (requestOrDonate.requestSchedule[obj["rice"]]?.value || 0),
                ramen:
                  store.requestSchedule.ramen +
                  (requestOrDonate.requestSchedule[obj["ramen"]]?.value || 0),
                milk:
                  store.requestSchedule.milk +
                  (requestOrDonate.requestSchedule[obj["milk"]]?.value || 0),
                mask:
                  store.requestSchedule.mask +
                  (requestOrDonate.requestSchedule[obj["mask"]]?.value || 0),
                soap:
                  store.requestSchedule.soap +
                  (requestOrDonate.requestSchedule[obj["soap"]]?.value || 0),
                water:
                  store.requestSchedule.water +
                  (requestOrDonate.requestSchedule[obj["water"]]?.value || 0),
                egg:
                  store.requestSchedule.egg +
                  (requestOrDonate.requestSchedule[obj["egg"]]?.value || 0),
                vegetable:
                  store.requestSchedule.vegetable +
                  (requestOrDonate.requestSchedule[obj["vegetable"]]?.value ||
                    0),
                shelter:
                  store.requestSchedule.shelter +
                  (requestOrDonate.requestSchedule[obj["shelter"]]?.value || 0),
              },
            },
            { new: true }
          );
        } else if (randomTen > 3 && randomTen <= 6) {
          type = "DONATION SCHEDULE";

          const { singleDonation, storeIndex } = createDonation(
            user._id,
            "schedule"
          );

          let store = await Store.findById(storeIndex);

          requestOrDonate = await Donation.create(singleDonation);

          const itemKeyIndex = {};
          requestOrDonate.item.map((el, idx) => (itemKeyIndex[el.name] = idx));
          store = await Store.findByIdAndUpdate(
            store._id,
            {
              donationSchedule: {
                rice:
                  store.donationSchedule.rice +
                  (requestOrDonate.item[itemKeyIndex["rice"]]?.value || 0),
                ramen:
                  store.donationSchedule.ramen +
                  (requestOrDonate.item[itemKeyIndex["ramen"]]?.value || 0),
                milk:
                  store.donationSchedule.milk +
                  (requestOrDonate.item[itemKeyIndex["milk"]]?.value || 0),
                egg:
                  store.donationSchedule.egg +
                  (requestOrDonate.item[itemKeyIndex["egg"]]?.value || 0),
                water:
                  store.donationSchedule.water +
                  (requestOrDonate.item[itemKeyIndex["water"]]?.value || 0),
                vegetable:
                  store.donationSchedule.vegetable +
                  (requestOrDonate.item[itemKeyIndex["vegetable"]]?.value || 0),
                mask:
                  store.donationSchedule.mask +
                  (requestOrDonate.item[itemKeyIndex["mask"]]?.value || 0),
                soap:
                  store.donationSchedule.soap +
                  (requestOrDonate.item[itemKeyIndex["soap"]]?.value || 0),
                shelter:
                  store.donationSchedule.rice +
                  (requestOrDonate.item[itemKeyIndex["shelter"]]?.value || 0),
              },
            },
            { new: true }
          );
        } else if (randomTen > 6) {
          type = "DONATION ACTUAL";

          const { singleDonation, storeIndex } = createDonation(
            user._id,
            "actual"
          );

          let store = await Store.findById(storeIndex);

          requestOrDonate = await Donation.create(singleDonation);

          const itemKeyIndex = {};
          requestOrDonate.item.map((el, idx) => (itemKeyIndex[el.name] = idx));
          store = await Store.findByIdAndUpdate(
            store._id,
            {
              donationActual: {
                rice:
                  store.donationActual.rice +
                  (requestOrDonate.item[itemKeyIndex["rice"]]?.value || 0),
                ramen:
                  store.donationActual.ramen +
                  (requestOrDonate.item[itemKeyIndex["ramen"]]?.value || 0),
                milk:
                  store.donationActual.milk +
                  (requestOrDonate.item[itemKeyIndex["milk"]]?.value || 0),
                egg:
                  store.donationActual.egg +
                  (requestOrDonate.item[itemKeyIndex["egg"]]?.value || 0),
                water:
                  store.donationActual.water +
                  (requestOrDonate.item[itemKeyIndex["water"]]?.value || 0),
                vegetable:
                  store.donationActual.vegetable +
                  (requestOrDonate.item[itemKeyIndex["vegetable"]]?.value || 0),
                mask:
                  store.donationActual.mask +
                  (requestOrDonate.item[itemKeyIndex["mask"]]?.value || 0),
                soap:
                  store.donationActual.soap +
                  (requestOrDonate.item[itemKeyIndex["soap"]]?.value || 0),
                shelter:
                  store.donationActual.rice +
                  (requestOrDonate.item[itemKeyIndex["shelter"]]?.value || 0),
              },
            },
            { new: true }
          );
        }

        console.log(` ${user.name} create ${type} ${requestOrDonate._id}`);
      } catch (error) {
        console.log(error);
        return;
      }
    }
  } catch (error) {
    console.log("error at generateData", error);
    return;
  }
};
const main = async (resetDB = false) => {
  if (resetDB) await generateData();
  return;
};
main(true);
