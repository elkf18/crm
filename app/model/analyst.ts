import analystAPI from "app/api/analyst";
import { Model } from "libs/model/model";
import { runInAction } from "mobx";
import SessionStore from "./session";


export class AnalystWorkDay extends Model {
    nomor_telepon = ""
    hari_kerja = ""
    jam_mulai_kerja = ""
    jam_selesai_kerja = ""
    status_analis = ""
    status_admin = ""
    keterangan = null
    id = 0
    nama = ""
    id_user = 0
}

export class AnalystRepository extends Model {
    listWorkDay: AnalystWorkDay[] = AnalystWorkDay.hasMany(this)
    listWorkDayApproved: AnalystWorkDay[] = AnalystWorkDay.hasMany(this)
    
    loading = false
    lastPage = false

    async loadConfirmed(offset: number) {
        if(offset == 0) {
            runInAction(() => {
                this.lastPage = false
            })
        }
        if(this.lastPage) {
            return;
        }
        runInAction(() => {
            this.loading = true
        })
        analystAPI.getAnalystWorkDay(SessionStore.user, offset).then((data) => {
            if(offset == 0) {
                runInAction(() => {
                    this.listWorkDay = []
                    this.listWorkDay = data
                })
            } else {
                runInAction(() => {
                    this.listWorkDay.push(...data)
                })
            }
            if(data.length == 0) {
                runInAction(() => {
                    this.lastPage = true
                })     
            }
            runInAction(() => {
                this.loading = false
            })   
        })
    }

    async loadApproved(offset: number) {
        if(offset == 0) {
            runInAction(() => {
                this.lastPage = false
            })
        }
        if(this.lastPage) {
            return;
        }
        runInAction(() => {
            this.loading = true
        })
        analystAPI.getAnalystWorkDayApproved(SessionStore.user, offset).then((data) => {
            if(offset == 0) {
                runInAction(() => {
                    this.listWorkDayApproved = []
                    this.listWorkDayApproved = data
                })
            } else {
                runInAction(() => {
                    this.listWorkDayApproved.push(...data)
                })
            }
            if(data.length == 0) {
                runInAction(() => {
                    this.lastPage = true
                })     
            }
            runInAction(() => {
                this.loading = false
            })   
        })
    }
}

const AnalystStore = AnalystRepository.create({
    localStorage: true,
    storageName: 'AnalystRepository',
})

export default AnalystStore;