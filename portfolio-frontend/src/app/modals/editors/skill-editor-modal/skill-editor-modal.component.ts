import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalType } from 'src/app/entities/modalType';
import { Skill } from 'src/app/entities/skill';
import { ModalService } from 'src/app/services/modal/modal.service';
import { SkillService } from 'src/app/services/skill/skill.service';

@Component({
  selector: 'app-skill-editor-modal',
  templateUrl: './skill-editor-modal.component.html',
  styleUrls: ['./skill-editor-modal.component.css'],
})
export class SkillEditorModalComponent {
  private _form: FormGroup;
  private originalSkill?: Skill = this.skillService.editableSkill;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private skillService: SkillService,
    private router: Router
  ) {
    this._form = this.formBuilder.group({
      name: [
        this.originalSkill?.name,
        [Validators.required, Validators.minLength(1)],
      ],
      percentage: [this.originalSkill?.percentage, [Validators.required]],
    });
  }

  public close(): void {
    this.modalService.type = ModalType.HIDDEN;
  }

  public get form(): FormGroup {
    return this._form;
  }

  public set form(form: FormGroup) {
    this._form = form;
  }

  public onSubmit(event: Event): void {
    if (this.originalSkill !== undefined && this.form.valid) {
      this.skillService.editableSkill = undefined;
      this.modalService.type = ModalType.HIDDEN;
      this.skillService
        .replaceSkill(Number(this.originalSkill.id), this.skill)
        .subscribe();
    }
  }

  public get skill(): Skill {
    let name: string = this.form.controls['name'].value;
    let percentage: number = Number(this.form.controls['percentage'].value);
    return {
      id: null,
      name: name,
      percentage: percentage,
    };
  }
}
