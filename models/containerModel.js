const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(__dirname),
    'data',
    'container.json'
);

const getContainersFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            console.log(err)
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Container {
    
    constructor(Id, Name, Created, Image, State, ImageID,Command, Status) {
        this.Id = Id;
        this.Names = new Array(Name);
        this.Created = Created;
        this.Image = Image;
        this.State = State;
        this.ImageID = ImageID;
        this.Command = Command;
        this.Status = Status;
    }

    save() {
        getContainersFromFile(Containers => {
            console.log("test");
            if (this.Id) {
                const existingContainerIndex = Containers.findIndex(
                    prod => prod.Id === this.Id
                );
                const updatedContainers = [...Containers];
                updatedContainers[existingContainerIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedContainers), err => {
                    console.log(err);
                });
            } else {
                this.Id = (new Date()).getTime().toString();
                Containers.push(this);
                fs.writeFile(p, JSON.stringify(Containers), err => {
                    console.log(err);
                });
            }
        });
    }

    static deleteById(Id) {
        getContainersFromFile(Containers => {
            const updatedContainers = Containers.filter(prod => prod.Id !== Id);
            fs.writeFile(p, JSON.stringify(updatedContainers), err => {
            });
        });
    }

    static fetchAll(cb) {
        getContainersFromFile(cb);
    }

    static findById(Id, cb) {
        getContainersFromFile(Containers => {
            const Container = Containers.find(p => p.Id === Id);
            cb(Container);
        });
    }
};