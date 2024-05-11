import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db, storage } from "./firebase";
import { toast } from "react-toastify";
import {
  equalTo,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import {
  getDownloadURL,
  uploadString,
  ref as sRef,
  uploadBytes,
} from "firebase/storage";
import axios from "axios";
let cnxUid = localStorage.getItem("connexUid");
let conexParent = localStorage.getItem("conexParent");

let cnxId = conexParent ? conexParent : cnxUid;
let baseUrl = "https://apis.connexcard.com/api/";

// ------------------------------------------------Login User-----------------------------------------------

export const handleLogin = (data, navigate) => {
  console.log("testing");

  if (data?.email && data?.password) {
    const starCountRef = ref(db, `/Admin`);
    onValue(starCountRef, async (snapshot) => {
      const admin = await snapshot.val();

      if (data?.email === admin?.email && data?.password === admin?.password) {
        localStorage.setItem("connexUid", "superAdmin");
        localStorage.setItem("conexParent", "superAdmin");
        navigate("/home");
        window.location.reload();
      } else {
        signInWithEmailAndPassword(auth, data.email, data.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("user", user);
            if (user) {
              const starCountRef = query(
                ref(db, "/Users"),
                orderByChild("id"),
                equalTo(user?.uid)
              );
              onValue(starCountRef, async (snapshot) => {
                const data = await snapshot.val();
                console.log("data", data);
                let dataArray = Object.values(data)?.[0];
                console.log(dataArray);
                if (dataArray?.isAdmin === true) {
                  localStorage.setItem("connexUid", user?.uid);
                  localStorage.setItem("conexParent", dataArray?.parentID);
                  navigate("/home");
                  window.location.reload();
                } else {
                  toast.warn("Access Denied!");
                }
                // console.log(data);
                // console.log("testing data");
                MediaKeyStatusMap;
                // setmylist(Object.values(data));

                // setfiltered(Object.values(data));

                // updateStarCount(postElement, data);
              });
            }

            //   const starCountRef = ref(db, `/User/${user?.uid}`);
            //   onValue(starCountRef, async (snapshot) => {
            //     const data = await snapshot.val();
            //     if (data?.parentId) {
            //       const starCountRef2 = ref(db, `/User/${data?.parentId}`);
            //       onValue(starCountRef2, async (thesnapshot) => {
            //         const parentdata = await thesnapshot.val();

            //         if (parentdata?.allowTeamLogin === true) {
            //           localStorage.setItem("tapNowUid", user.uid);
            //           navigate("/home");
            //           toast.success("Login Sucessfuly");
            //           window.location.reload(true);
            //         } else {
            //           toast.warning("Access Denied!");
            //         }
            //       });
            //     } else {
            //       localStorage.setItem("tapNowUid", user.uid);
            //       toast.success("Login Sucessfuly");
            //       navigate("/home");
            //       window.location.reload(true);
            //     }
            //   });

            // toast.success('Login Sucessfuly')

            // navigate('/home')

            // ...
          })
          .catch((error) => {
            console.log(error.message);
            if (error.message === "Firebase: Error (auth/user-not-found).") {
              toast.error("User not Found !");
            } else if (
              error.message === "Firebase: Error (auth/wrong-password)."
            ) {
              toast.error("Wrong Password !");
            }
          });
      }
    });
  } else {
    toast.error("Email and password should not be empty!");
  }
};

// ------------------------------------------------Forget Password-----------------------------------------------

export const forgetPassword = (email) => {
  if (!email) {
    toast.error("Email is required");
  } else {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success(
          "An email have been sent to you, please verify to change password"
        );
        // ..
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message === "Firebase: Error (auth/user-not-found).") {
          toast.error("User not found!");
        }
      });
  }
};

// ------------------------------------------------Create new card-----------------------------------------------
let randNum = () => {
  let val = Math.floor(1000 + Math.random() * 9000);
  return val;
};
export const createNewCard = async (data, callBack) => {
  if (data.name && data.email && data.password) {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user.uid)

        let cnxId = localStorage.getItem("connexUid");
        let conexParent = localStorage.getItem("conexParent");
        if (conexParent != "superAdmin") {
          update(ref(db, `Users/${user.uid}`), {
            platform: "web",
            address: "",
            backgroundColor: "",
            bio: "",
            city: "",
            color: "",
            coverUrl: "",
            darkTheme: "0",
            directMode: false,
            dob: "",
            email: data.email,
            fcmToken: "",
            gender: "",
            id: user.uid,
            isActivateTag: false,
            isCover: false,
            isCustomLink: false,
            isDeleted: false,
            isEmail: true,
            isFirstLink: false,
            isProVersion: false,
            isProfile: false,
            isProfilePhoto: false,
            isReqByMe: false,
            isReqByOther: false,
            isShareProfile: false,
            isSubscribe: false,
            job: "",
            language: "en",
            logoUrl: "",
            name: data?.name,
            parentID: cnxId,
            parentId: "",
            phone: "",
            proVersionExpiryDate: "",
            proVersionPurchaseDate: "",
            profileOn: 1,
            profileUrl: "",
            socialTextColor: "#FF000000",
            title: "",
            totalViews: 0,
            username: randNum() + data?.name + user.uid,
            website: "",
            workPlace: "",
            formHeader: "Contact me!",
            leadForm: {
              Fname: true,
              company: true,
              email: true,
              job: true,
              note: true,
              phone: true,
            },
            isAdmin: false,
            isCompany: false,
            qrLogoUrl: "",
            leadMode: false,
            textColor: "",
          }).then(() => {
            axios
              .post(`${baseUrl}createAccount`, {
                companyId: cnxId,
                email: data?.email,
                password: data?.password,
                token: "12f3g4hj2j3h4g54h3juyt5j4k3jngbfvkg43hj",
              })
              .then((res) => {
                console.log("the response", res);
              })
              .catch((err) => {
                console.log(err);
              });
            toast.success("New user created sucessfuly");
            handleTeamModal();
          });
        } else {
          update(ref(db, `Users/${user.uid}`), {
            platform: "web",
            address: "",
            backgroundColor: "#000000",
            bio: "",
            city: "",
            color: "#000000",
            coverUrl: "",
            darkTheme: "0",
            directMode: false,
            dob: "",
            email: data.email,
            fcmToken: "",
            gender: "",
            id: user.uid,
            isActivateTag: false,
            isCover: false,
            isCustomLink: false,
            isDeleted: false,
            isEmail: true,
            isFirstLink: false,
            isProVersion: false,
            isProfile: false,
            isProfilePhoto: false,
            isReqByMe: false,
            isReqByOther: false,
            isShareProfile: false,
            isSubscribe: false,
            job: "",
            language: "en",
            logoUrl: "",
            name: data?.name,
            parentID: "",
            parentId: "",
            phone: "",
            proVersionExpiryDate: "",
            proVersionPurchaseDate: "",
            profileOn: 1,
            profileUrl: "",
            socialTextColor: "#FF000000",
            title: "",
            totalViews: 0,
            username: randNum() + data?.name + user.uid,
            website: "",
            workPlace: "",
            formHeader: "Contact me!",
            leadForm: {
              Fname: true,
              company: true,
              email: true,
              job: true,
              note: true,
              phone: true,
            },
            isAdmin: true,
            isCompany: true,
            qrLogoUrl: "",
            leadMode: false,
          }).then(() => {
            axios
              .post(`${baseUrl}createAccount`, {
                email: data?.email,
                password: data?.password,
                token: "12f3g4hj2j3h4g54h3juyt5j4k3jngbfvkg43hj",
              })
              .then((res) => {
                console.log("the response", res);
              })
              .catch((err) => {
                console.log(err);
              });
            toast.success("New user created sucessfuly");
            handleTeamModal();
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        //   const errorMessage = error.message;
        console.log(error.message);
        if (error.message === "Firebase: Error (auth/invalid-email).") {
          toast.error("Please enter valid email");
        } else if (
          error.message === "Firebase: Error (auth/email-already-in-use)."
        ) {
          toast.error("Email already exits");
        } else if (
          error.message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          toast.error("Password must be at least 6 characters");
        }

        // ..
      });

    callBack();
  } else {
    toast.error("Email , password and user name should not be empty");
  }
};
// ------------------------------------------------Get all child profiles-----------------------------------------------

export const getAllChilds = async (callBackFunc, setloading) => {
  setloading(true);
  const starCountRef = query(
    ref(db, "/Users"),
    orderByChild("parentID"),
    equalTo(cnxId)
  );
  onValue(starCountRef, async (snapshot) => {
    const data = await snapshot.val();
    if (data) {
      callBackFunc(data);
      console.log(data);
      setloading(false);
      console.log("testing data");
    } else {
      setloading(false);
    }

    MediaKeyStatusMap;
    // setmylist(Object.values(data));

    // setfiltered(Object.values(data));

    // updateStarCount(postElement, data);
  });
};

// ------------------------------------------------Get all companies-----------------------------------------------

export const getAllCompanies = async (callBackFunc, setloading) => {
  setloading(true);
  const starCountRef = query(
    ref(db, "/Users"),
    orderByChild("isCompany"),
    equalTo(true)
  );
  onValue(starCountRef, async (snapshot) => {
    const data = await snapshot.val();
    callBackFunc(data);
    console.log(data);
    setloading(false);
    console.log("testing data");
    MediaKeyStatusMap;
    // setmylist(Object.values(data));

    // setfiltered(Object.values(data));

    // updateStarCount(postElement, data);
  });
};

// ------------------------------------------------Get single child profile-----------------------------------------------

export const getSingleChild = (id, callBackFunc) => {
  const starCountRef = query(
    ref(db, "/Users"),
    orderByChild("id"),
    equalTo(id)
  );
  onValue(starCountRef, async (snapshot) => {
    const data = await snapshot.val();
    callBackFunc(data);
    console.log(data);
    console.log("testing data");
    MediaKeyStatusMap;
    // setmylist(Object.values(data));

    // setfiltered(Object.values(data));

    // updateStarCount(postElement, data);
  });
};

// ------------------------------------------------delete single child profile-----------------------------------------------

export const deleteSingleChild = (id, companyId) => {
  console.log("api start working......");
  axios
    .post(`${baseUrl}deleteAccount`, {
      id,
      token: "12f3g4hj2j3h4g54h3juyt5j4k3jngbfvkg43hj",
    })
    .then((res) => {
      console.log("the response", res);
      // const starCountRef = query(
      //   ref(db, "/Teams"),
      //   orderByChild("companyId"),
      //   equalTo(cnxId)
      // );
      // onValue(starCountRef, async (snapshot) => {
      //   const data = await snapshot.val();
      //   if (data) {
      //     callBackFunc(data);
      //     setloading(false);
      //   } else {
      //     setloading(false);
      //   }

      //   console.log(data);
      //   console.log("testing data");
      //   MediaKeyStatusMap;
      // });
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("api end working......");
};

// ------------------------------------------------Update About Data-----------------------------------------------

let returnIfHttps = (string) => {
  console.log("the string", string?.slice(0, 4));
  if (string != "" && string) {
    if ((string?.slice(0, 4) === "http") | (string?.slice(0, 4) === "/src")) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

export const updataAbout = async (id, data) => {
  let {
    name,
    job,
    address,
    coverUrl,
    phone,
    bio,
    profileUrl,
    logoUrl,
    color,
    textColor,
  } = data;
  // if (name || location || job || company || bio || colorCode) {
  update(ref(db, `Users/${id}`), {
    name,
    job,
    address,
    phone,
    // colorCode,
    // job,
    // company,
    bio,
    profileUrl,
    logoUrl,
    coverUrl,
    color,
    textColor,
  }).then(() => {
    if (returnIfHttps(profileUrl) === false) {
      let name = new Date().getTime() + id;
      const storageRef1 = sRef(storage, name);
      uploadString(storageRef1, profileUrl.slice(23), "base64", {
        contentType: "image/png",
      })
        .then(() => {
          console.log("img testing");
          getDownloadURL(storageRef1)
            .then((URL) => {
              // console.log(URL)
              update(ref(db, `Users/${id}`), { profileUrl: URL });
              // setprflimg("");
              // window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
          // setimg(null)
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (returnIfHttps(coverUrl) === false) {
      let name = new Date().getTime() + id;
      const storageRef2 = sRef(storage, name);
      uploadString(storageRef2, coverUrl.slice(23), "base64", {
        contentType: "image/png",
      })
        .then(() => {
          console.log("img testing");
          getDownloadURL(storageRef2)
            .then((URL) => {
              // console.log(URL)
              update(ref(db, `Users/${id}`), { coverUrl: URL });
              // setBgImg("");
              // window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
          // setimg(null)
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (returnIfHttps(logoUrl) === false) {
      let name = new Date().getTime() + id;
      const storageRef3 = sRef(storage, name);
      uploadString(storageRef3, logoUrl.slice(23), "base64", {
        contentType: "image/png",
      })
        .then(() => {
          console.log("img testing");
          getDownloadURL(storageRef3)
            .then((URL) => {
              // console.log(URL)
              update(ref(db, `Users/${id}`), { logoUrl: URL });
              // setlogoImg("");
              // window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
          // setimg(null)
        })
        .catch((error) => {
          console.log(error);
        });
    }
    toast.success("Information updated sucessfuly");
  });
  // }
};

// ------------------------------------------------Update Qr Data-----------------------------------------------

export const updateQrInfo = async (id, qrColor, logoimg) => {
  // if (qrColor || qrLogo) {
  // toast.success("Information updated successfuly");
  console.log("qr testing", logoimg);
  console.log("qrlogo", logoimg);
  update(ref(db, `Users/${id}`), { qrColor, qrLogoUrl: logoimg }).then(() => {
    if (returnIfHttps(logoimg) === false) {
      let name = new Date().getTime() + id;
      const storageRef = sRef(storage, name);
      uploadString(storageRef, logoimg.slice(23), "base64", {
        contentType: "image/png",
      })
        .then(() => {
          console.log("img testing");
          getDownloadURL(storageRef)
            .then((URL) => {
              // console.log(URL)
              update(ref(db, `Users/${id}`), { qrLogoUrl: URL });
              // setlogoimg("");
              // window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
          // setimg(null)
        })
        .catch((error) => {
          console.log(error);
        });
    }
    toast.success("Information updated successfuly");
  });
  // console.log("qrrrrr");

  // }
};

// ------------------------------------------------Update lead Data-----------------------------------------------

export const updateLead = async (id, formHeader, leadForm) => {
  update(ref(db, `Users/${id}`), { formHeader, leadForm }).then(() => {
    toast.success("Information updated successfuly");
  });
};

// ------------------------------------------------Create New Team-----------------------------------------------

export const createTeam = async (data, callBack) => {
  if (data?.name) {
    // toast.success("Information updated successfuly");
    let pushKey = push(ref(db, `Teams/`), {
      teamName: data?.name,
      companyId: cnxId,
    }).key;

    update(ref(db, `Teams/${pushKey}`), { teamId: pushKey }).then(() => {
      if (returnIfHttps(data?.img) === false) {
        let name = new Date().getTime() + pushKey;
        const storageRef = sRef(storage, name);
        uploadString(storageRef, data?.img.slice(23), "base64", {
          contentType: "image/png",
        })
          .then(() => {
            console.log("img testing");
            getDownloadURL(storageRef)
              .then((URL) => {
                // console.log(URL)
                update(ref(db, `Teams/${pushKey}`), { image: URL }).then(() => {
                  toast.success("New team created successfuly");
                  callBack();
                });
                // setlogoimg("");
                // window.location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
            // setimg(null)
          })
          .catch((error) => {
            console.log(error);
            callBack();
          });
      } else {
        toast.success("New team created successfuly");
        callBack();
      }
    });
    // console.log("qrrrrr");
  } else {
    toast.error("Team name should not be empty");
  }
};

// ------------------------------------------------Get all teams-----------------------------------------------

export const getAllTeams = async (callBackFunc, setloading) => {
  setloading(true);
  const starCountRef = query(
    ref(db, "/Teams"),
    orderByChild("companyId"),
    equalTo(cnxId)
  );
  onValue(starCountRef, async (snapshot) => {
    const data = await snapshot.val();
    if (data) {
      callBackFunc(data);
      setloading(false);
    } else {
      setloading(false);
    }

    console.log(data);
    console.log("testing data");
    MediaKeyStatusMap;
    // setmylist(Object.values(data));

    // setfiltered(Object.values(data));

    // updateStarCount(postElement, data);
  });
};

// ------------------------------------------------Add team member-----------------------------------------------

export const addTeamMember = async (
  team,
  membersId,
  cb,
  setMemberIds,
  members,
  setMembers
) => {
  console.log("test.....", members);
  if (membersId.length > 0) {
    if (team?.members) {
      let memberArray = Object.values(team?.members);
      await set(ref(db, `Teams/${team?.teamId}/members/`), [
        ...memberArray,
        ...membersId,
      ]).then(async () => {
        const updatePromises = members?.map(async (elm) => {
          console.log("testing...");
          if (elm?.teams && typeof elm?.teams === "object") {
            await set(ref(db, `Users/${elm?.id}/teams/`), [
              ...Object.values(elm?.teams),
              team?.teamId,
            ]);
          } else {
            await set(ref(db, `Users/${elm?.id}/teams/`), [team?.teamId]);
          }
        });

        try {
          const updatedIds = await Promise.all(updatePromises);
          console.log("Updated IDs:", updatedIds);
          // Handle success, show success message, etc.
          toast.success("Team updated successfuly");
          cb();
          setMemberIds([]);
          setMembers([]);
        } catch (error) {
          console.error("Error updating objects:", error);
          // Handle error, show error message, etc.
          toast.error("Error updating objects");
        }
      });
    } else {
      set(ref(db, `Teams/${team?.teamId}/members/`), [...membersId]).then(
        async () => {
          const updatePromises = members?.map(async (elm) => {
            console.log("testing...");
            if (elm?.teams && typeof elm?.teams === "object") {
              await set(ref(db, `Users/${elm?.id}/teams/`), [
                ...Object.values(elm?.teams),
                team?.teamId,
              ]);
            } else {
              await set(ref(db, `Users/${elm?.id}/teams/`), [team?.teamId]);
            }
          });

          try {
            const updatedIds = await Promise.all(updatePromises);
            console.log("Updated IDs:", updatedIds);
            // Handle success, show success message, etc.
            toast.success("Team updated successfuly");
            cb();
            setMemberIds([]);
            setMembers([]);
          } catch (error) {
            console.error("Error updating objects:", error);
            // Handle error, show error message, etc.
            toast.error("Error updating objects");
          }
        }
      );
    }
  } else {
    toast.error("Please add atleast 1 member");
  }
};

// ------------------------------------------------Get single child profile-----------------------------------------------

export const getAllTeamMembers = (arr, callBack, members) => {
  callBack([]);
  if (arr) {
    console.log(arr);
    Object.values(arr)?.map((elm) => {
      const starCountRef = query(
        ref(db, "/Users"),
        orderByChild("id"),
        equalTo(elm)
      );
      onValue(starCountRef, async (snapshot) => {
        const data = await snapshot.val();
        if (data) {
          callBack((prev) => [...prev, ...Object.values(data)]);
        }

        console.log(data);
        console.log("testing data");
        MediaKeyStatusMap;
      });
    });
  }
};

export const getAllTeamMembersLength = (arr) => {
  if (arr) {
    console.log(arr);
    let membersArray = [];
    Object.values(arr)?.map((elm) => {
      const starCountRef = query(
        ref(db, "/Users"),
        orderByChild("id"),
        equalTo(elm)
      );
      onValue(starCountRef, async (snapshot) => {
        const data = await snapshot.val();
        if (data) {
          membersArray?.push(Object.values(data));
        }

        console.log(data);
        console.log("testing data");
        MediaKeyStatusMap;
      });
    });
  }
};

// ----------------------------------------------------Add link to database---------------------------------------------

export const addNewLink = async (
  linkData,
  id,
  allLinks,
  handleLinkEditModal,
  ifCompany,
  allMembers
) => {
  console.log(ifCompany(id));
  if (linkData?.value) {
    console.log("img64", linkData?.image);
    console.log(allLinks);
    if (allLinks) {
      if (returnIfHttps(linkData?.image) === false) {
        console.log("testing........6");
        let name = new Date().getTime() + id;
        const storageRef = sRef(storage, name);
        uploadString(storageRef, linkData?.image.slice(23), "base64", {
          contentType: "image/png",
        })
          .then(() => {
            console.log("img testing");
            getDownloadURL(storageRef)
              .then((URL) => {
                // console.log(URL)

                set(ref(db, `Users/${id}/links/`), [
                  ...allLinks,
                  {
                    image: URL,
                    linkID: linkData?.linkID,
                    name: linkData?.name,
                    value: linkData?.value,
                    shareable: linkData?.shareable,
                  },
                ]).then(async () => {
                  if (ifCompany(id) && allMembers?.length > 0) {
                    const promiseAddingLinkToChilds = allMembers?.map(
                      async (elm) => {
                        if (elm?.links) {
                          const valueExists = Object.values(elm?.links)?.some(
                            (obj) => obj["linkID"] === linkData?.linkID
                          );
                          if (!valueExists) {
                            await set(ref(db, `Users/${elm?.id}/links/`), [
                              ...Object.values(elm?.links),

                              {
                                image: URL,
                                linkID: linkData?.linkID,
                                name: linkData?.name,
                                value: linkData?.value,
                                shareable: linkData?.shareable,
                              },
                            ]);
                          }
                        } else {
                          await set(ref(db, `Users/${elm?.id}/links/`), [
                            {
                              image: URL,
                              linkID: linkData?.linkID,
                              name: linkData?.name,
                              value: linkData?.value,
                              shareable: linkData?.shareable,
                            },
                          ]);
                        }
                      }
                    );

                    try {
                      const updatedUserlinks = await Promise.all(
                        promiseAddingLinkToChilds
                      );
                      console.log("Updated IDs:", updatedUserlinks);
                      // Handle success, show success message, etc.
                      toast.success("Link added successfuly");
                      handleLinkEditModal();
                    } catch (error) {
                      console.error("Error updating objects:", error);
                      // Handle error, show error message, etc.
                      toast.error("Error updating objects");
                    }
                  } else {
                    toast.success("Link added successfuly");
                    handleLinkEditModal();
                  }
                });
              })
              .catch((error) => {
                console.log(error);
              });
            // setimg(null)
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        set(ref(db, `Users/${id}/links/`), [...allLinks, linkData]).then(
          async () => {
            // checking if link is added by company so that link should be added to all childs
            if (ifCompany(id) && allMembers?.length > 0) {
              const promiseAddingLinkToChilds = allMembers?.map(async (elm) => {
                if (elm?.links) {
                  const valueExists = Object.values(elm?.links)?.some(
                    (obj) => obj["linkID"] === linkData?.linkID
                  );
                  if (!valueExists) {
                    await set(ref(db, `Users/${elm?.id}/links/`), [
                      ...Object.values(elm?.links),
                      linkData,
                    ]);
                  }
                } else {
                  await set(ref(db, `Users/${elm?.id}/links/`), [linkData]);
                }
              });

              try {
                const updatedUserlinks = await Promise.all(
                  promiseAddingLinkToChilds
                );
                console.log("Updated IDs:", updatedUserlinks);
                // Handle success, show success message, etc.
                toast.success("Link added successfuly");
                handleLinkEditModal();
              } catch (error) {
                console.error("Error updating objects:", error);
                // Handle error, show error message, etc.
                toast.error("Error updating objects");
              }
            } else {
              toast.success("Link added successfuly");
              handleLinkEditModal();
            }
          }
        );
      }
    } else {
      if (returnIfHttps(linkData?.image) === false) {
        console.log(returnIfHttps(linkData?.image));
        let name = new Date().getTime() + id;
        const storageRef = sRef(storage, name);
        uploadString(storageRef, linkData?.image.slice(23), "base64", {
          contentType: "image/png",
        })
          .then(() => {
            console.log("img testing");
            getDownloadURL(storageRef)
              .then((URL) => {
                // console.log(URL)

                set(ref(db, `Users/${id}/links/`), [
                  {
                    image: URL,
                    linkID: linkData?.linkID,
                    name: linkData?.name,
                    value: linkData?.value,
                    shareable: linkData?.shareable,
                  },
                ]).then(async () => {
                  if (ifCompany(id) && allMembers?.length > 0) {
                    const promiseAddingLinkToChilds = allMembers?.map(
                      async (elm) => {
                        if (elm?.links) {
                          const valueExists = Object.values(elm?.links)?.some(
                            (obj) => obj["linkID"] === linkData?.linkID
                          );
                          if (!valueExists) {
                            await set(ref(db, `Users/${elm?.id}/links/`), [
                              ...Object.values(elm?.links),
                              {
                                image: URL,
                                linkID: linkData?.linkID,
                                name: linkData?.name,
                                value: linkData?.value,
                                shareable: linkData?.shareable,
                              },
                            ]);
                          }
                        } else {
                          await set(ref(db, `Users/${elm?.id}/links/`), [
                            linkData,
                          ]);
                        }
                      }
                    );

                    try {
                      const updatedUserlinks = await Promise.all(
                        promiseAddingLinkToChilds
                      );
                      console.log("Updated IDs:", updatedUserlinks);
                      // Handle success, show success message, etc.
                      toast.success("Link added successfuly");
                      handleLinkEditModal();
                    } catch (error) {
                      console.error("Error updating objects:", error);
                      // Handle error, show error message, etc.
                      toast.error("Error updating objects");
                    }
                  } else {
                    toast.success("Link added successfuly");
                    handleLinkEditModal();
                  }
                });
              })
              .catch((error) => {
                console.log(error);
              });
            // setimg(null)
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        set(ref(db, `Users/${id}/links/`), [linkData]).then(async () => {
          if (ifCompany(id) && allMembers?.length > 0) {
            const promiseAddingLinkToChilds = allMembers?.map(async (elm) => {
              if (elm?.links) {
                const valueExists = Object.values(elm?.links)?.some(
                  (obj) => obj["linkID"] === linkData?.linkID
                );
                if (!valueExists) {
                  await set(ref(db, `Users/${elm?.id}/links/`), [
                    ...Object.values(elm?.links),
                    linkData,
                  ]);
                }
              } else {
                await set(ref(db, `Users/${elm?.id}/links/`), [linkData]);
              }
            });

            try {
              const updatedUserlinks = await Promise.all(
                promiseAddingLinkToChilds
              );
              console.log("Updated IDs:", updatedUserlinks);
              // Handle success, show success message, etc.
              toast.success("Link added successfuly");
              handleLinkEditModal();
            } catch (error) {
              console.error("Error updating objects:", error);
              // Handle error, show error message, etc.
              toast.error("Error updating objects");
            }
          } else {
            toast.success("Link added successfuly");
            handleLinkEditModal();
          }
        });
      }
    }
  }
};

// ----------------------------------------------------Update link to database---------------------------------------------

export const updateNewLink = (linkData, id, allLinks, handleLinkEditModal) => {
  // if (linkData?.value) {

  if (allLinks) {
    let index = allLinks?.findIndex((elm) => {
      return elm?.linkID === linkData?.linkID;
    });

    update(ref(db, `Users/${id}/links/${index}`), { ...linkData }).then(() => {
      handleLinkEditModal();
      toast.success("Link updated successfuly");
    });
  }
  // }
};

// ----------------------------------------------------Remove link from database---------------------------------------------

export const renoveLink = (linkData, id, allLinks, cb) => {
  // if (linkData?.value) {
  if (allLinks) {
    let remainingLinks = allLinks?.filter((elm) => {
      return elm?.linkID != linkData?.linkID;
    });
    console.log(remainingLinks);
    if (remainingLinks?.length === 0) {
      remove(ref(db, `Users/${id}/links/`)).then(() => {
        cb();
        // toast.success("Link deleted successfuly");
      });
    } else {
      set(ref(db, `Users/${id}/links/`), [...remainingLinks]).then(() => {
        cb();
        // toast.success("Link deleted successfuly");
      });
    }
  }
  // }
};

// ----------------------------------------------------Handle to change lead mode---------------------------------------------

export const updateLeadMode = (leadMode, id) => {
  update(ref(db, `Users/${id}/`), { leadMode: !leadMode });
};

// ---------------------------------------Handle to change direct mode----------------------------------

export const handleChangeDirect = (directMode, id, link) => {
  // e.preventDefault()
  if (directMode) {
    update(ref(db, `Users/${id}`), {
      directMode: false,
      direct: { name: "", value: "", title: "" },
    }).then(() => {
      // navigate('/profileedit')
    });
  } else {
    update(ref(db, `Users/${id}`), {
      directMode: true,
      direct: {
        name: link[0]?.name,
        value: link[0]?.value,
        linkID: link[0]?.linkID,
      },
    }).then(() => {
      // navigate('/profileedit')
    });
  }
};

export const addtoDirect = (name, linkID, value, id, image) => {
  update(ref(db, `Users/${id}/`), {
    direct: { name, linkID, value, image },
  });
};

// ---------------------------------------Handle delete company----------------------------------
export const deleteCompany = (team, callBack) => {
  remove(ref(db, `Teams/${team?.teamId}`)).then(async () => {
    if (team?.members && typeof team?.members === "object") {
      const membersPromises = Object.values(team?.members)?.map((elm) => {
        const starCountRef = query(
          ref(db, "/Users"),
          orderByChild("id"),
          equalTo(elm)
        );
        onValue(starCountRef, async (snapshot) => {
          const data = await snapshot.val();
          if (Object.values(data)?.[0]) {
            console.log(data);
            if (
              Object.values(data)?.[0]?.teams &&
              typeof Object.values(data)?.[0]?.teams === "object"
            ) {
              const remainingTeams = Object.values(
                Object.values(data)?.[0]?.teams
              )?.filter((elem) => {
                return elem != team?.teamId;
              });
              set(ref(db, `Users/${Object.values(data)?.[0]?.id}/teams/`), [
                ...remainingTeams,
              ]);
            }
          }

          console.log(data);
          console.log("testing data");
          MediaKeyStatusMap;
        });
      });

      try {
        const updatedIds = await Promise.all(membersPromises);
        console.log("Updated IDs:", updatedIds);
        // Handle success, show success message, etc.
        callBack();
        toast.success("Team deleted successfuly");
      } catch (error) {
        console.error("Error updating objects:", error);
        // Handle error, show error message, etc.
        toast.error("Error updating objects");
      }
    }
  });
};

// ---------------------------------------Handle change Profile Status----------------------------------
export const changeProfileStatus = (status, id) => {
  if (status === 1) {
    update(ref(db, `Users/${id}/`), { profileOn: 0 });
  } else {
    update(ref(db, `Users/${id}/`), { profileOn: 1 });
  }
};

// ------------------------------------------------Get single child profile-----------------------------------------------

export const getContacts = (id, cb) => {
  const starCountRef = query(
    ref(db, "/Contacts"),
    orderByChild("parentId"),
    equalTo(id)
  );
  onValue(starCountRef, async (snapshot) => {
    const data = await snapshot.val();
    cb(Object.values(data));
    console.log(data);

    MediaKeyStatusMap;
  });
};

// ---------------------------------------Handle delete contact----------------------------------
export const deleteContact = (id, cb) => {
  remove(ref(db, `Contacts/${id}`)).then(() => {
    cb();
    toast.success("Contact deleted successfuly");
  });
};

export const updataCompanyAbout = async (id, data) => {
  let {
    name,
    address,
    phone,
    bio,
    nameLock,
    phoneLock,
    locationLock,
    bioLock,
  } = data;
  update(ref(db, `Users/${id}`), {
    name,
    address,
    phone,
    nameLock,
    phoneLock,
    locationLock,
    bioLock,
    bio,
  }).then(() => {
    // const starCountRef = query(
    //   ref(db, "/Users"),
    //   orderByChild("parentID"),
    //   equalTo(id)
    // );
    // onValue(starCountRef, async (snapshot) => {
    //   const thedata = await snapshot.val();
    //   if (thedata) {
    //     // let allChilds = Object.keys(thedata);
    //     Object.keys(thedata)?.forEach(async (elm) => {
    //       await update(ref(db, `Users/${elm}`), {
    //         nameLock,
    //         phoneLock,
    //         locationLock,
    //         bioLock,
    //       });
    //     });
    //   }

    //   toast.success("Information updated sucessfuly");

    //   // console.log(data);
    //   // MediaKeyStatusMap;
    // });
    // updateBulkData(id, nameLock, phoneLock, locationLock, bioLock);
    toast.success("Information updated sucessfuly");
  });

  // }
};

// ------------------------------------------------update Company Profile-----------------------------------------------

export const updateCompanyProfile = async (id, data) => {
  let {
    coverUrl,
    profileUrl,
    logoUrl,
    color,
    textColor,
    coverLock,
    logoLock,
    profilePictureLock,
  } = data;
  // if (name || location || job || company || bio || colorCode) {
  update(ref(db, `Users/${id}`), {
    color,
    textColor,
    profileUrl,
    logoUrl,
    coverUrl,
    coverLock,
    logoLock,
    profilePictureLock,
  }).then(() => {
    if (returnIfHttps(profileUrl) === false) {
      let name = new Date().getTime() + id;
      const storageRef = sRef(storage, name);
      uploadString(storageRef, profileUrl.slice(23), "base64", {
        contentType: "image/png",
      })
        .then(() => {
          console.log("img testing");
          getDownloadURL(storageRef)
            .then((URL) => {
              // console.log(URL)
              update(ref(db, `Users/${id}`), { profileUrl: URL });
              // setprflimg("");
              // window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
          // setimg(null)
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (returnIfHttps(coverUrl) === false) {
      let name = new Date().getTime() + id;
      const storageRef = sRef(storage, name);
      uploadString(storageRef, coverUrl.slice(23), "base64", {
        contentType: "image/png",
      })
        .then(() => {
          console.log("img testing");
          getDownloadURL(storageRef)
            .then((URL) => {
              // console.log(URL)
              update(ref(db, `Users/${id}`), { coverUrl: URL });
              // setBgImg("");
              // window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
          // setimg(null)
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (returnIfHttps(logoUrl) === false) {
      let name = new Date().getTime() + id;
      const storageRef = sRef(storage, name);
      uploadString(storageRef, logoUrl.slice(23), "base64", {
        contentType: "image/png",
      })
        .then(() => {
          console.log("img testing");
          getDownloadURL(storageRef)
            .then((URL) => {
              // console.log(URL)
              update(ref(db, `Users/${id}`), { logoUrl: URL });
              // setlogoImg("");
              // window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
          // setimg(null)
        })
        .catch((error) => {
          console.log(error);
        });
    }
    toast.success("Information updated sucessfuly");
  });
  // }
};

// ------------------------------------------------update Team-----------------------------------------------

export const updateTeam = async (data, callBack, teamId) => {
  if (data?.name) {
    update(ref(db, `Teams/${teamId}`), { teamName: data?.name }).then(() => {
      if (returnIfHttps(data?.img) === false) {
        let name = new Date().getTime() + teamId;
        const storageRef = sRef(storage, name);
        uploadString(storageRef, data?.img.slice(23), "base64", {
          contentType: "image/png",
        })
          .then(() => {
            console.log("img testing");
            getDownloadURL(storageRef)
              .then((URL) => {
                // console.log(URL)
                update(ref(db, `Teams/${teamId}`), { image: URL });
                // setlogoimg("");
                // window.location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
            // setimg(null)
          })
          .catch((error) => {
            console.log(error);
            callBack();
          });
      }
      toast.success("updated successfuly");
      callBack();
    });
    // console.log("qrrrrr");
  } else {
    toast.error("Team name should not be empty");
  }
};

// ----------------------------------------------------Remove Team Member---------------------------------------------

export const removeTeamMember = (user, userId, teamId, allMembers, cb) => {
  // if (linkData?.value) {
  if (allMembers) {
    let remainingMembers = allMembers?.filter((elm) => {
      return elm != userId;
    });

    console.log("remainingMembers", remainingMembers);

    set(ref(db, `Teams/${teamId}/members/`), [...remainingMembers]).then(() => {
      if (typeof user?.teams === "object") {
        let userTeams = Object.values(user?.teams);
        let remainingTeams = userTeams?.filter((elm) => {
          return elm != teamId;
        });
        set(ref(db, `Users/${userId}/teams/`), [...remainingTeams]).then(() => {
          cb(userId);
          toast.success("Team member deleted successfuly");
        });
      }
    });
  }
  // }
};

// ----------------------------------------------------Split String---------------------------------------------

export const splitString = (str, num) => {
  if (str) {
    if (str?.length > num) {
      let endStr = str?.slice(0, num);
      return endStr + "...";
    } else {
      return str;
    }
  }
};

// ----------------------------------------------------Split String---------------------------------------------

export const updateLinkShareAble = async (id, linkID, shareable, link) => {
  // shareable,allLinks
  // Find the index of the object with the given ID
  const objectIndex = link?.findIndex((obj) => obj.linkID === linkID);

  // Check if the object exists
  if (objectIndex !== -1) {
    // Create a copy of the object
    const updatedObject = { ...link[objectIndex] };

    // Update the value of the desired property
    updatedObject.shareable = !shareable;

    // Create a new array with the updated object
    const updatedArray = [...link];
    updatedArray[objectIndex] = updatedObject;
    set(ref(db, `Users/${id}/links/`), [...updatedArray]);
  }

  // const starCountRef = query(
  //   ref(db, `/Users/${id}/links`),
  //   orderByChild("linkID"),
  //   equalTo(linkID)
  // );
  // onValue(starCountRef, async (snapshot) => {
  //   const data = await snapshot.val();
  //   // cb(Object.values(data));
  //   console.log(data);
  //   console.log(Object.keys(data)[0]);
  //   if (data) {
  //     let index = Object.keys(data)[0];

  //     update(ref(db, `Users/${id}/links/${index}`), {
  //       shareable: !shareable,
  //     }).then(() => {
  //       // toast.success("Link deleted successfuly");
  //       // cb();
  //     });
  //   }
  //   MediaKeyStatusMap;
  // });
};

// ------------------------------------------------Get single child profile-----------------------------------------------

export const getSingleChildAnalytics = (id, callBackFunc, setloading) => {
  setloading(true);
  const starCountRef = query(
    ref(db, "/Analytic"),
    orderByChild("userid"),
    equalTo(id)
  );
  onValue(starCountRef, async (snapshot) => {
    const data = await snapshot.val();

    callBackFunc(data);
    setloading(false);
    console.log("analyticsdata", data);
    // console.log("testing data");
    MediaKeyStatusMap;
    // setmylist(Object.values(data));

    // setfiltered(Object.values(data));

    // updateStarCount(postElement, data);
  });
};

// ------------------------------------------------Get single child profile-----------------------------------------------

export const adminAccess = (companyId, email, cb) => {
  if (email) {
    axios
      .post(`${baseUrl}adminAccess`, {
        companyId,
        token: "12f3g4hj2j3h4g54h3juyt5j4k3jngbfvkg43hj",
        email,
      })
      .then((res) => {
        toast.success(res?.data?.message);
        console.log("the response", res);
        cb("");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        console.log(err?.response?.data?.message);
      });
  } else {
    toast.success("Email is required");
  }
};

// ------------------------------------------------Remove Admin-----------------------------------------------

export const removeAdmin = (id) => {
  update(ref(db, `Users/${id}/`), {
    isAdmin: false,
  });
};

export const handleLogout = (cb) => {
  localStorage.removeItem("connexUid");
  localStorage.removeItem("conexParent");
  cb();
};
