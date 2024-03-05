import {
  createUserWithEmailAndPassword,
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
  set,
  update,
} from "firebase/database";
import { getDownloadURL, uploadString, ref as sRef } from "firebase/storage";
let cnxId = localStorage.getItem("connexUid");
let conexParent = localStorage.getItem("conexParent");
// ------------------------------------------------Login User-----------------------------------------------

export const handleLogin = (data, navigate) => {
  console.log("testing");
  if (data?.email && data?.password) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("connexUid", user?.uid);
        navigate();

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
        // const errorCode = error.code;
        const errorMessage = error.message;
        // alert(errorMessage)

        console.log(error.message);

        if (error.message === "Firebase: Error (auth/user-not-found).") {
          toast.error("User not Found !");
        } else if (error.message === "Firebase: Error (auth/wrong-password).") {
          toast.error("Wrong Password !");
        }
      });
  } else {
    toast.error("Email and password should not be empty!");
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
          name: "",
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
          formHeader: "",
          leadForm: {
            Fname: true,
            company: true,
            email: true,
            job: true,
            note: true,
            phone: true,
          },
          isAdmin: false,
          qrLogoUrl: "",
        }).then(() => {
          toast.success("New user created sucessfuly");
          handleTeamModal();
        });
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

export const getAllChilds = async (callBackFunc) => {
  const starCountRef = query(
    ref(db, "/Users"),
    orderByChild("parentID"),
    equalTo(cnxId)
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

// ------------------------------------------------Update About Data-----------------------------------------------

let returnIfHttps = (string) => {
  if (string != "") {
    if (string.slice(0, 4) === "http") {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

export const updataAbout = async (id, data) => {
  let { name, email, address, coverUrl, phone, bio, profileUrl, logoUrl } =
    data;
  // if (name || location || job || company || bio || colorCode) {
  update(ref(db, `Users/${id}`), {
    name,
    email,
    address,
    phone,
    // colorCode,
    // job,
    // company,
    bio,
    profileUrl,
    logoUrl,
    coverUrl,
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

// ------------------------------------------------Update Qr Data-----------------------------------------------

export const updateQrInfo = async (id, qrColor, logoimg) => {
  // if (qrColor || qrLogo) {
  // toast.success("Information updated successfuly");
  update(ref(db, `Users/${id}`), { qrColor }).then(() => {
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
      companyId: conexParent ? conexParent : cnxId,
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
                update(ref(db, `Teams/${pushKey}`), { image: URL });
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
      toast.success("New team created successfuly");
      callBack();
    });
    // console.log("qrrrrr");
  } else {
    toast.error("Team name should not be empty");
  }
};

// ------------------------------------------------Get all teams-----------------------------------------------

export const getAllTeams = async (callBackFunc) => {
  const starCountRef = query(
    ref(db, "/Teams"),
    orderByChild("companyId"),
    equalTo(conexParent ? conexParent : cnxId)
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

// ------------------------------------------------Add team member-----------------------------------------------

export const addTeamMember = (team, membersId) => {
  if (membersId.length > 0) {
    if (team?.members) {
      let memberArray = Object.values(team?.members);
      set(ref(db, `Teams/${team?.teamId}/members/`), [
        ...team?.memberArray,
        ...membersId,
      ]).then(() => {
        toast.success("Team updated successfuly");
      });
    } else {
      set(ref(db, `Teams/${team?.teamId}/members/`), [...membersId]).then(
        () => {
          toast.success("Team updated successfuly");
        }
      );
    }
  } else {
    toast.error("Please add atleast 1 member");
  }
};

// ------------------------------------------------Get single child profile-----------------------------------------------

export const getAllTeamMembers = (arr, callBack, members) => {
  arr?.map((elm) => {
    const starCountRef = query(
      ref(db, "/Users"),
      orderByChild("id"),
      equalTo(elm)
    );
    onValue(starCountRef, async (snapshot) => {
      const data = await snapshot.val();
      callBack([...members, ...Object.values(data)]);
      console.log(data);
      console.log("testing data");
      MediaKeyStatusMap;
    });
  });
};

// ----------------------------------------------------Add link to database---------------------------------------------

export const addNewLink = (linkData, id, allLinks) => {
  if (linkData?.value) {
    if (allLinks) {
      set(ref(db, `Users/${id}/links/`), [...allLinks, linkData]).then(() => {
        toast.success("Link added successfuly");
      });
    } else {
      set(ref(db, `Users/${id}/links/`), [linkData]).then(() => {
        toast.success("Link added successfuly");
      });
    }
  }

  // if (theLink.value && theLink.name) {
  //   if (
  //     title.includes("Link") ||
  //     title.includes("link") ||
  //     title.includes("Url")
  //   ) {
  //     if (isURL(theLink.value)) {
  //       if (link) {
  //       }
  //     } else {
  //       toast.error("Invalid url or link");
  //     }
  //   }

  // else {
  //   if (link) {
  //     set(ref(db, `User/${user?.id}/links/`), [...link, theLink]).then(
  //       () => {
  //         toast.success("Link added successfuly");
  //         dispatch(openLinkModal());
  //         dispatch(removeLink());
  //         dispatch(setLinkHighlight(false));
  //         dispatch(setLinkDescription(""));
  //         settheLink({
  //           isHide: false,
  //           isHighLighted: false,
  //           name: singlelink.name,
  //           title: "",
  //           value: "",
  //           description: "",
  //         });
  //       }
  //     );
  //   }
  // }
  // }
};

// ----------------------------------------------------Update link to database---------------------------------------------

export const updateNewLink = (linkData, id, allLinks) => {
  // if (linkData?.value) {
  if (allLinks) {
    let linksWithoutCrnt = allLinks?.filter((elm) => {
      return elm?.linkID != linkData?.linkID;
    });

    set(ref(db, `Users/${id}/links/`), [...linksWithoutCrnt, linkData]).then(
      () => {
        toast.success("Link added successfuly");
      }
    );
  }
  // }
};
