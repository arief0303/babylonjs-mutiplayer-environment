export default class CharacterCustomization {

    constructor(room) {
        this._room = room;
        this._avatar = null;
        this._avatarPack = {
            base: JSON.parse(localStorage.getItem('bita_avatar'))?.base || "Female",
            head: JSON.parse(localStorage.getItem('bita_avatar'))?.head || ["Avatar1_FemaleHair2"],
            body: JSON.parse(localStorage.getItem('bita_avatar'))?.body || ["Avatar1_Jacket2", "Avatar1_T-Shirt"],
            pants: JSON.parse(localStorage.getItem('bita_avatar'))?.pants || ["Avatar1_Pants", "Avatar1_Shoes"]
        };
        this._avatarModel = null;
        this._avatarLocal = JSON.parse(localStorage.getItem('bita_avatar')) || false;
        this._avatarHeadList = 
        [
            {
                name: "HeadMaleBase",
                list: ["Avatar1_MaleHair2"]
            },
            {
                name: "HeadMale1",
                list: ["Character_Father_01_Hair", "Character_Father_01_Beard"]
            },
            {
                name: "HeadMale2",
                list: ["Character_Father_02_Hair", "Character_Father_02_Beard"]
            },
            {
                name: "HeadMale3",
                list: ["Character_SchoolBoy_01_Hair"]
            },
            {
                name: "HeadMale4",
                list: ["Character_ShopKeeper_01_Hat"]
            },
            {
                name: "HeadFemaleBase",
                list: ["Avatar1_FemaleHair2"]
            },
            {
                name: "HeadFemale1",
                list: ["Character_Daughter_01_Hair", "Character_Daughter_01_Hat"]
            },
            {
                name: "HeadFemale2",
                list: ["Character_Mother_01_Hair", "Character_Mother_01_Glasses"]
            },
            {
                name: "HeadFemale3",
                list: ["Character_Mother_02_Hair"]
            },
            {
                name: "HeadFemale4",
                list: ["Character_SchoolGirl_01_Hair"]
            }
        ];

        this._avatarBodyList = 
        [
            {
                name: "BodyMaleBase",
                list: ["Avatar1_Jacket", "Avatar1_T-Shirt2"] 
            },
            {
                name: "BodyMale1",
                list: ["Character_Father_01_Top"]
            },
            {
                name: "BodyMale2",
                list: ["Character_Father_02_Top", "Character_Father_02_Watch"]
            },
            {
                name: "BodyMale3",
                list: ["Character_SchoolBoy_01_Top"]
            },
            {
                name: "BodyMale4",
                list: ["Character_ShopKeeper_01_Top"]
            },
            {
                name: "BodyMale5",
                list: ["Character_Son_01_Top"]
            },
            {
                name: "BodyFemaleBase",
                list: ["Avatar1_Jacket2", "Avatar1_T-Shirt"]
            },
            {
                name: "BodyFemale1",
                list: ["Character_Daughter_01_Top"]
            },
            {
                name: "BodyFemale2",
                list: ["Character_Mother_01_Top", "Character_Mother_01_Shoes"]
            },
            {
                name: "BodyFemale3",
                list: ["Character_Mother_02_Top", "Character_Mother_02_Shoes"]
            },
            {
                name: "BodyFemale4",
                list: ["Character_SchoolGirl_01_Top"]
            }
        ];

        this._avatarPantsList = 
        [
            {
                name: "PantsMaleBase",
                list: ["Avatar1_Pants2", "Avatar1_Shoes"]
            },
            {
                name: "PantsMale1",
                list: ["Character_Father_01_Pants", "Character_Father_01_Sandal"]
            },
            {
                name: "PantsMale2",
                list: ["Character_Father_02_Pants", "Character_Father_02_Sandal"]
            },
            {
                name: "PantsMale3",
                list: ["Character_SchoolBoy_01_Pants", "Character_SchoolBoy_01_Shoes"]
            },
            {
                name: "PantsMale4",
                list: ["Character_ShopKeeper_01_Pants", "Character_ShopKeeper_01_Shoes"]
            },
            {
                name: "PantsMale5",
                list: ["Character_Son_01_Pants", "Character_Son_01_Shoes"]
            },
            {
                name: "PantsFemaleBase",
                list: ["Avatar1_Pants", "Avatar1_Shoes"]
            },
            {
                name: "PantsFemale1",
                list: ["Character_Daughter_01_Pants", "Character_Daughter_01_Shoes"]
            },
            {
                name: "PantsFemale2",
                list: ["Character_SchoolGirl_01_Skirt", "Character_SchoolGirl_01_Shoes"]
            }
        ];

        // console.log('this character')
        // console.log(this._room)

        if (this._room !== undefined) {
            this._room.send("updateCharacter", {
                base: localStorage.getItem('bita_base'),
                head: localStorage.getItem('bita_head'),
                body: localStorage.getItem('bita_body'),
                pants: localStorage.getItem('bita_pants'),
            });
        }
        

        
        
    }

    /** @type {CharacterCustomization} */
    static instance;

    /**
    * @returns {CharacterCustomization}
    */
	static getInstance = (room) => {
        
		if (!CharacterCustomization.instance) {
            CharacterCustomization.instance = new CharacterCustomization(room);
            
        }
    

		return CharacterCustomization.instance;
    };

    getCurrentAvatar () {
        // if(this._avatar == null)
        // {
        //     this.setCurrentAvatar("Female", "FemaleHair2", "Jacket2", "Pants", "Shoes", "T-Shirt", "Watch");
        // }
        return this._avatar;
    }

    setCurrentAvatar (base, hair, jacket, pants, shoes, cloth, accesory) {
        this._avatar = 
        {
            base: base || "Avatar1_Female",
            hair: hair || "Avatar1_FemaleHair2",
            jacket: jacket || "Avatar1_Jacket2",
            pants: pants || "Avatar1_Pants",
            shoes: shoes || "Avatar1_Shoes",
            cloth: cloth || "Avatar1_T-Shirt",
            accesory: accesory || "Avatar1_Watch",
        };
        
    }

    getCurrentAvatarModel () {
        return this._avatarModel;
    }

    setCurrentAvatarModel (meshes) {
        this._avatarModel = meshes;
    }

    setBase (base)
    {
        this._avatar.base = base;
    }

    setHair (hair)
    {
        this._avatar.hair = hair;
    }

    setJacket (jacket)
    {
        this._avatar.jacket = jacket;
    }

    setCloth (cloth)
    {
        this._avatar.cloth = cloth;
    }

    setPants (pants)
    {
        this._avatar.pants = pants;
    }

    setShoes (shoes)
    {
        this._avatar.shoes = shoes;
    }

    setAccesory (accesory)
    {
        this._avatar.accesory = accesory;
    }

    getCurrentAvatarPack () {
        // this._room = room
        // console.log('isi room character')
        // console.log(this._avatarPack)
        // if(this._avatar == null)
        // {
        //     this.setCurrentAvatar("Female", "FemaleHair2", "Jacket2", "Pants", "Shoes", "T-Shirt", "Watch");
        // }

        if (this._room !== undefined) {
            this._room.send("updateCharacter", {
                base: base,
                head: head,
                body: body,
                pants: pants,
            });
        }
        
        
        return this._avatarPack;
    }

    setCurrentAvatarPack (base, head, body, pants) {

        

        if (this._room !== undefined) {
            console.log('GAK UNDEFINED')
            this._room.send("updateCharacter", {
                base: base,
                head: head,
                body: body,
                pants: pants,
            });
        }

        
        this.setBasePack(base);
        this.setHeadPack(head);
        this.setBodyPack(body);
        this.setPantsPack(pants);
    }

    setBasePack (baseName)
    {
        this._avatarPack.base = baseName;
    }

    setHeadPack (headName)
    {
        this._avatarHeadList.forEach((e) => {
            if(e.name == headName)
            {
                this._avatarPack.head = e.list;
            }
        });
        console.log(this._avatarPack.head);
        
        // set default
        if(this._avatarPack.head[0] == null || this._avatarPack.head[0] == undefined)
        {
            this._avatarPack.head = ["Avatar1_FemaleHair2"];
        }
    }

    setBodyPack (bodyName)
    {
        this._avatarBodyList.forEach((e) => {
            if(e.name == bodyName)
            {
                this._avatarPack.body = e.list;
            }
        });
        console.log(this._avatarPack.body);

        // set default
        if(this._avatarPack.body[0] == null || this._avatarPack.body[0] == undefined)
        {
            this._avatarPack.body = ["Avatar1_Jacket2", "Avatar1_T-Shirt"];
        }
    }

    setPantsPack (pantsName)
    {
        this._avatarPantsList.forEach((e) => {
            if(e.name == pantsName)
            {
                this._avatarPack.pants = e.list;
            }
        });
        console.log(this._avatarPack.pants);

        // set default
        if(this._avatarPack.pants[0] == null || this._avatarPack.pants[0] == undefined)
        {
            this._avatarPack.pants = ["Avatar1_Pants", "Avatar1_Shoes"];
        }
    }

}